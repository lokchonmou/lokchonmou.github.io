# ESP32 進階應用：無線通訊 × Web 控制 RGB（ESP-NOW × Web Server）

> 本章目標：透過兩個典型 IoT 任務，讓你理解「無 Wi-Fi 點對點通訊」與「前端控制實體裝置」的核心模式。
>
> **主題 A：ESP-NOW 無線短訊 × 加密解密**
> **主題 B：ESP32 作為 Web Server 控制 RGB LED（Color Picker）**

## 1｜ESP-NOW 是什麼？（IoT 必學技術）

ESP32 除了可以用 Wi-Fi 上網，其實仲有另一套 **不靠路由器（AP）都可通訊** 的 protocol：

> **ESP-NOW = 超低延遲 × 不用 Wi-Fi × 點對點或廣播 × 只靠 MAC 地址通訊**

你可以把佢理解為：

- 「ESP32 專用短訊網絡」
- 「本地機器之間互傳 message」
- 「不經網絡、不上互聯網」
- 「超快，極穩定」

常見用途：

- IoT 節點之間交換資料（不需 AP）
- Robot vs Robot 通訊
- 感測器 → 控制器
- 遊戲、遙控車、分散系統
- Mesh Network（高階）

------

## 2｜實作：建立老師端（Sender） × 學生端（Receiver）

兩塊 ESP32 就可以做到本地通訊。

> **先用「明碼」發送 message。**
> 下一部才加密。

在這個練習中，老師會用ESP32 NOW發送一段文字給你，你需要用ESP32接收老師給你訊息，然後在老師核對時，告訴老師你收到甚麼。

------

### 2.1 Sender（老師端）

**功能：每 5 秒廣播一段字串 message。**==你不需要上傳這段，這段老師已經做了，你負責接收訊息==

```c++
#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF}; // Broadcast

typedef struct struct_message {
  char msg[50];
} struct_message;

struct_message packet;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW Init Failed");
    return;
  }

  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;
  esp_now_add_peer(&peerInfo);
}

void loop() {
  strcpy(packet.msg, "HELLO STUDENTS");
  esp_now_send(broadcastAddress, (uint8_t *)&packet, sizeof(packet));
  Serial.println("Sent: HELLO STUDENTS");
  delay(5000);
}
```

------

### 2.2 Receiver（學生端）

**功能：顯示收到的 message**

```C++
#include <esp_now.h>
#include <WiFi.h>

typedef struct struct_message {
  char msg[50];
} struct_message;

struct_message incoming;

//收到訊息時會執行這一段====================================================
void onReceive(const esp_now_recv_info *info, const uint8_t *data, int len) {
  memcpy(&incoming, data, sizeof(incoming));
  Serial.print("收到訊息：");
  Serial.println(incoming.msg);
}
//收到訊息時會執行這一段====================================================

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW Init Failed");
    return;
  }
  //只要在setup()中注冊一次就可以, ESP32會在收到訊息時暫時中斷loop()，先執行onReceive()
  esp_now_register_recv_cb(onReceive);
}

void loop() {}  //如果有其他別的內容，正常放在這裡就可以
```

## 3｜🔥ESP-NOW 進階：使用內建 AES-128 加密通訊

> 本章目標：在上一章的基礎上，讓 ESP32 之間的通訊提升至真正的「安全 IoT」級別。
> ESP-NOW 原生支援 **AES-128 加密**，你只需要在「Peer 配對」階段加入 16 bytes Key，
> Sender 傳送時會自動加密，Receiver 收到後自動解密，程式不需要自己寫 encryption / decryption。

------

### 3.1｜什麼是 ESP-NOW AES 加密？

ESP32 的 ESP-NOW 通訊可以分為：

| 模式            | 是否安全             | 是否需要 Key           | 適合用途                              |
| --------------- | -------------------- | ---------------------- | ------------------------------------- |
| 無加密（Open）  | ❌ 不安全（可被嗅探） | ❌ 不需要               | 教學示範、簡單測試                    |
| 加密（AES-128） | ✔ 安全               | ✔ **需要 16 字節 Key** | 正式 IoT 通訊、同學互傳訊息、設備連線 |

ESP-NOW 使用的加密方式：

> **AES-128（ECB）硬件加速**
>
> Sender → AES Encrypt → RF 傳輸 → Receiver Firmware 自動解密 → `onReceive()` 取得明文

👉 完全感覺唔到加密存在，但安全性明顯更高。

### 3.2｜AES-128 Key（16 bytes）點處理？

ESP-NOW 加密需要固定 **16 bytes（128 bits）key**。

你可以：

- 用固定 key：`uint8_t key[16] = { 0x01,0x02,... }`
- 或者用==15==字節 ASCII（e.g. `"1234567890ABCDEF"`）==**C 語言字串會自動加多一個 `\0`（Null terminator）**==，所以如果用16個字節，實際會變成 **17 bytes** → **超出 ESP-NOW AES Key 的 16 bytes 限制**。

示例 key：(15字節的`String`)

``` c++
"LOKCM is GENIUS"
```

或 (16字節的`Char` array)

```c++
uint8_t myKey[16] = {
  'L','O','K','C','M',' ','i','s',' ','G','E','N','I','U','S','!'
};
```

### 3.3｜加密限制

> **AES 加密模式不支援 broadcast / multicast MAC 地址。**
>  即：
>  `FF:FF:FF:FF:FF:FF` → ❌ 不能加密
>  任何 group address（最低 bit = 1）→ ❌ 不能加密

➡ ESP-NOW 加密 **只能用「單對單」MAC 對 MAC**
➡ 不能「一部加密後廣播俾全班」

### 3.4｜整體流程

每隊 2 個學生、2 部 ESP32：

1. **各自讀取本機 MAC**
2. Sender 把 Receiver 的 MAC 填入程式
3. Receiver 把 Sender 的 MAC 填入程式
4. 雙方使用 **同一條 AES128 Key（16 bytes）**
5. 一端 send() → 另一端 onReceive() 自動解密

### 3.5｜第一步：讀取每部 ESP32 的 MAC Address

請每位學生先燒錄以下程式：

```c++
#include <WiFi.h>
#include <esp_wifi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  uint8_t mac[6];
  esp_wifi_get_mac(WIFI_IF_STA, mac);   // 永遠能讀到正確 MAC

  Serial.printf("ESP32 MAC: %02X:%02X:%02X:%02X:%02X:%02X\n",
    mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
}

void loop(){}
```

學生記錄輸出的 MAC，例如：

- 同學 A：`7C:DF:A1:12:34:56`
- 同學 B：`B4:E6:2D:98:76:54`

### 3.6｜Receiver（接收端）程式完整版本

（把 Sender 的 MAC 貼進 `senderMAC[]`）

> **接收端只需要接，唔需要 send**
> 穩定度：極高
> 安全：已自動解密

```c++
#include <WiFi.h>
#include <esp_now.h>

typedef struct struct_message {
  char msg[50];
} struct_message;

struct_message incoming;

// 同學 A（Receiver） → 填入同學 B（Sender）的 MAC
uint8_t senderMAC[6] = 填入同學 B（Sender）的 MAC 例如咁 {0xB4,0xE6,0x2D,0x98,0x76,0x54};

// AES Key（16 bytes）
uint8_t myKey[16] = 改一個15字節密碼例如咁"LOKCM is Genius";
// 或者咁:
//uint8_t myKey[16] = {'L','O','K','C','M',' ','i','s',' ','G','E','N','I','U','S','!'};

void onReceive(const esp_now_recv_info *info, const uint8_t *data, int len) {
  memcpy(&incoming, data, sizeof(incoming));

  Serial.print("收到訊息：");
  Serial.println(incoming.msg);
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW Init Failed");
    return;
  }

  // 配對 Sender（必須）
  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, senderMAC, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = true;               
  memcpy(peerInfo.lmk, myKey, 16);

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Add Peer Failed");
    return;
  }

  esp_now_register_recv_cb(onReceive);
}

void loop(){}
```

### 3.7｜Sender（發送端）程式完整版本

（把 Receiver 的 MAC 貼入 `receiverMAC[]`）

> **加密後 send() 的資料會自動加密 → Receiver 自動解密**
> 唔需要你寫 encryption/decryption。

```c++
#include <WiFi.h>
#include <esp_now.h>

typedef struct struct_message {
  char msg[50];
} struct_message;

struct_message packet;

// 同學 B（Sender） → 填入同學 A（Receiver）的 MAC
uint8_t receiverMAC[6] = 填入同學 A（Receiver）的 MAC例如咁{0x7C,0xDF,0xA1,0x12,0x34,0x56};

// AES Key（16 bytes）
uint8_t myKey[16] = 改一個15字節密碼例如咁"LOKCM is Genius";
// 或者咁:
//uint8_t myKey[16] = {'L','O','K','C','M',' ','i','s',' ','G','E','N','I','U','S','!'};

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW Init Failed");
    return;
  }

  // 配對 Receiver（必須）
  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, receiverMAC, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = true;               
  memcpy(peerInfo.lmk, myKey, 16);

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Add Peer Failed");
    return;
  }
}

void loop() {
  strcpy(packet.msg, "Hello from Sender!");

  esp_now_send(receiverMAC, (uint8_t*)&packet, sizeof(packet));
  Serial.println("已發送加密訊息。");

  delay(2000); // 每 2 秒發送一次
}
```

### 3.8｜兩位學生必須同步做的設定

| 步驟               | Receiver        | Sender            |
| ------------------ | --------------- | ----------------- |
| 啟動 WiFi STA mode | ✔               | ✔                 |
| 填入對方 MAC       | ✔ `senderMAC[]` | ✔ `receiverMAC[]` |
| 設定相同 AES Key   | ✔               | ✔                 |
| add_peer()         | ✔               | ✔                 |
| 使用 encrypt=true  | ✔               | ✔                 |
| 使用 peerInfo.lmk  | ✔               | ✔                 |

只要其中一個設定錯誤 → 完全收不到訊息。

### 3.9｜進階挑戰

> 都是你之後常會遇到的問題

![螢幕截圖 2025-11-26 19.21.50](%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202025-11-26%2019.21.50.png)

## 4｜ESP32 Web Server：用瀏覽器控制 RGB LED

> **核心概念：** ESP32 = Server（提供網頁）
> Browser = Client（按色板 → POST JSON → ESP32 控制 LED）

上一章，我們學習了前端、後端的概念。我們將前端放在 **自己的電腦** 上，用 VS Code 的 Live Server 去 host。這種方式只是本地測試，網頁只存在於電腦本身，其他裝置無法使用。

但如果介面不太複雜，我們可以 **直接把網站架在 ESP32 裡面**，將ESP32作為AP（Access Point）。

這樣做有不少明顯好處：

1. **完全獨立運作，不依賴學校 Wi-Fi 或家用路由器**：
	ESP32 自己開熱點，
	學生手機直接連入即可。
	避免校網密碼限制、網路隔離、AP Client 數量限制等問題。
2. **部署成本極低、裝置即插即用**：
	只需要一條 USB 線即可運行整套系統；
	不需要額外伺服器、路由器或雲端。
3. **無網絡延遲與干擾，控制反應極快**：
	AP 模式只有 ESP32 與你的裝置兩者通訊，
	避免校園 Wi-Fi 擁塞導致的 delay、packet loss。
4. **方便課堂示範與分組實驗**：
	每一組學生的 ESP32 都可以獨立開 AP，
	各自的網頁和硬件互不干擾。
5. **網站與硬件封裝在同一裝置內，學習概念更清晰**：
	- ESP32 = Server（提供 HTML + JS）
	- Browser = Client（透過 HTTP 控制硬件）
	- 完整理解前端→後端→硬件的資料流。
6. **非常適合控制界面（Control Panel/UI）**：
	色板、按鈕、Slider、LED 控制、馬達開關等操作，
	都適合直接放在 ESP32 內，實作成本低、反應快。

### 4.1｜完整流程（HTML Color Picker × fetch × ESP32）

#### 4.1.1｜ESP32 程式：建立 Web Server + 控制 RGB PWM

在AP 模式：

- **ESP32 自己開 Wi-Fi 熱點**
- 手機 / Notebook 直接連 ESP32
- 不需任何外部 Wi-Fi
- 不需 WiFi.begin()
- 不需 Router

```C++
#include <WiFi.h>
#include <WebServer.h>

WebServer server(80);

// 你想叫咩名都得
const char* ap_ssid = 麻煩你改改佢,唔係會同一時間有3x個同名wifi"ESP32-RGB";
const char* ap_pass = "12345678";   // 必須 ≥ 8 字符；如不想要密碼要特別寫法

int r_pin = 14, g_pin = 12, b_pin = 13;

String webpage = R"=====(
<!DOCTYPE html>
<html>
<body>
<h2>RGB LED 控制（AP 模式）</h2>
<input type="color" id="picker">
<script>
document.getElementById("picker").addEventListener("input", e => {
    fetch("/set", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({color: e.target.value})
    });
});
</script>
</body>
</html>
)=====";

void handleRoot(){
  server.send(200, "text/html", webpage);
}

void handleSet(){
  String body = server.arg("plain"); 
  int idx = body.indexOf("#");
  String hex = body.substring(idx+1, idx+7);

  long rgb = strtol(hex.c_str(), NULL, 16);
  int r = (rgb >> 16) & 255;
  int g = (rgb >> 8) & 255;
  int b = rgb & 255;

  analogWrite(r_pin, r);
  analogWrite(g_pin, g);
  analogWrite(b_pin, b);

  server.send(200, "text/plain", "OK");
}

void setup(){
  Serial.begin(115200);
  
  // ★★★ 關鍵：開 AP，不需要 WiFi.begin() ★★★
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ap_ssid, ap_pass);

  Serial.print("AP 開啓，SSID：");
  Serial.println(ap_ssid);
  Serial.print("IP 地址：");
  Serial.println(WiFi.softAPIP());   // 通常是 192.168.4.1

  pinMode(r_pin, OUTPUT);
  pinMode(g_pin, OUTPUT);
  pinMode(b_pin, OUTPUT);

  server.on("/", handleRoot);
  server.on("/set", HTTP_POST, handleSet);
  server.begin();
}

void loop(){
  server.handleClient();
}
```

#### 4.1.2｜操作方式（AP 模式）

1. ESP32 通電後 → 自己開 Wi-Fi 熱點
	 SSID：`ESP32-RGB`
	 Password：`12345678`
2. 學生手機 / Notebook 連接這個熱點
3. 在瀏覽器輸入：

```
http://192.168.4.1/
```

即可彈出你的 Color Picker 頁面。

### 4.2｜進階挑戰

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202025-11-26%2019.22.40.png" alt="螢幕截圖 2025-11-26 19.22.40" style="width:45%;" />

##5｜📘 本章總結（精簡版）

本章透過兩個核心實作，讓你掌握 IoT 系統中最常見的兩種模式：

 **1｜ESP-NOW 加密通訊（點對點）**

- 使用 **MAC 對 MAC** 的方式建立連線
- 必須雙向配對 + 使用相同的 16-byte AES Key
- 傳輸過程由 ESP32 自動加密／解密
- 適合簡易控制訊息、分組互傳、近距離低延遲應用

 **2｜ESP32 作為 AP + Web Server（控制 RGB LED）**

- ESP32 自行建立 Wi-Fi 熱點，手機直接連入
- 不依賴外部路由器，課堂操作最穩定
- 以瀏覽器載入 ESP32 提供的網頁，用 fetch() POST JSON 控制硬件
- 完整示範「前端 → 後端 → 硬件」資料流

 **你已掌握：**

- 點對點安全通訊（ESP-NOW AES）
- 建立基本 Web API（/set）
- HTML Color Picker × PWM 控 RGB

本章建立了 IoT 教學中兩個最重要的模型：
**裝置間通訊** 與 **用瀏覽器控制硬件**，為後續更多互動式 IoT 專題打好基礎。