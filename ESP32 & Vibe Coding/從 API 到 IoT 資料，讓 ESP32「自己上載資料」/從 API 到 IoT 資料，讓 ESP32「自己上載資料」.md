# 🔧 從 API 到 IoT 資料，讓 ESP32「自己上載資料」

在學會向 API 「問世界」之後，ESP32 亦可以變成「被問的一方」。
例如接上 DHT11 或 DHT22 感測器，量度溫度與濕度，再打包成 JSON 資料上傳到雲端，例如 Google Sheet。

> 先用 **random 數據**確認通路成功，再換成 **溫濕度**。

## 🧠 概念流程

Sensor → ESP32 → HTTP POST → Google Apps Script → Google Sheet

ESP32 量度溫濕度，打包成 JSON 格式，透過 **Google Apps Script (GAS)** 做「橋樑」。
ESP32 就係向呢個 GAS 網址傳送 JSON，GAS 再幫你寫入 Sheet。

## 0) 前置

- 一個 Google 帳戶；一個新 Google Sheet（命名：`ESP32_Data`），
	- 注意是==下方==這個頁面名稱必須為`ESP32_Data`，不是上方。
- 首行表頭：`Timestamp | Device | Value | Extra`（可先留空 `Extra` 俾之後溫濕度用）。

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202025-11-05%2019.37.41.png" alt="螢幕截圖 2025-11-05 19.37.41" style="width:30%;" />

## 1) 建立 Google Apps Script（GAS）做橋樑

在該 Sheet 中：**Extensions → Apps Script**，將預設 `Code.gs` 全部改為以下：

```javascript
function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActive().getSheetByName('ESP32_Data');
        const raw = e && e.postData ? e.postData.contents : '{}';
        const data = JSON.parse(raw);
        // 可選：簡單 token 驗證（正式使用時）
        // if (data.token !== 'YOUR_TOKEN') return ContentService.createTextOutput('DENIED').setMimeType(ContentService.MimeType.TEXT);


        const now = new Date();
        const device = data.device || 'ESP32';
        const value = data.value;
        const extra = data.extra || '';


        sheet.appendRow([now, device, value, extra]);
        return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
    } catch (err) {
        // 便於除錯：在 Apps Script 的 Executions 內可見
        console.error(err);
        return ContentService.createTextOutput('ERROR').setMimeType(ContentService.MimeType.TEXT);
    }
}
```

### 部署為 Web App（**必要**）

- **Deploy → Manage deployments → New deployment**
- **Type：Web app**
- **Execute as：Me**（由你寫入 Sheet）
- **Who has access：Anyone**（Demo 階段）
- 允許權限後，取得 URL（以 `/exec` 結尾）。

> 提醒：每次改動程式後如需公開新版本，要 **New deployment** 或 **Edit deployment** 重新部署。

## 2) ESP32 —— 階段 A：先上傳 random 數據（通路驗證）

**只需識睇幾句**：Wi‑Fi 連線、指定 URL、POST JSON、`Content-Type: application/json`。

``` c++
#include <WiFi.h>
#include <HTTPClient.h>


const char* ssid = "YOUR_WIFI";
const char* pass = "YOUR_PASS";
const char* GAS_URL = "https://script.google.com/macros/s/XXXXXXXX/exec"; // 你的 /exec 連結


void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED) { delay(300); Serial.print('.');}


    HTTPClient http;
    http.begin(GAS_URL);
    http.addHeader("Content-Type", "application/json");


    String payload = String("{\"device\":\"ESP32_A1\", \"Value\":") + String(random(20, 41)) + "}";
    // 20–40 隨機整數
    int code = http.POST(payload);
    Serial.printf("HTTP %d", code);
    Serial.println(payload);
    Serial.println(http.getString());
    http.end();
}


void loop() {}
```

==記得不要將你的密碼和`GAS_URL`給AI。==

**達標畫面**：Sheet 會多一行，`Value` 欄出現 20–40 之間的數字，`Timestamp` 自動填入。

> 節奏：先單發一次（`loop()` 空置）。確認成功後，再改成每 10s 上報一次。

## 3) ESP32 —— 階段 B：換成溫濕度（最小改動）

> 只替換 **payload 組裝** 部分；其餘（Wi‑Fi、URL、POST）保持不變。

**要點**：

- 使用 `DHT` 或 `SHT31` 等模組；示例以 DHT11：
- 需要行庫：`DHT sensor library`（by Adafruit）、`Adafruit Unified Sensor`。
- *<u>提示：您是否應該先開一個新的對話/開一個新的獨立檔案，先測試一下感測器？</u>*

```c++
#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);


void setup(){ 
    Serial.begin(115200); 
    /* 省略 Wi‑Fi 連線與 http.begin(...) */ 
    dht.begin(); 
    sendOnce();
}

void loop() {}

void sendOnce(){
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    // 只換呢句：把 random 換成 JSON（可放更多欄位入 Extra）
    String payload = String("{\"device\":\"ESP32_A1\", \"value\":" ) + String(t, 1) +
    ", \"extra\": \"humi=" + String(h, 1) + "%\"}";
    // 然後照舊 http.POST(payload)
}
```

> Sheet 欄位含義：`Value = 溫度`，`Extra = "humi=65.3%"`。之後你亦可改為同時寫兩欄，或把 `Value` 換成 JSON string 由 GAS 拆開。

先在`setup()`最下方，加一行`sendOnce()`，避免程式有bug都濫發。

**如果測試後沒有問題，請你告知AIjf 將`sendOnce()`放在`loop()`之中，每10秒上傳一次(正式場景 5–60 秒)。**



## 4) 頻率與穩定性（避免被當作濫發）

| 項目         | 建議                                      | 原因                                 |
| ------------ | ----------------------------------------- | ------------------------------------ |
| 上傳間隔     | **≥ 10 秒**（教學示範），正式場景 5–60 秒 | Apps Script 執行配額＆Sheet 刷新成本 |
| 連線失敗重試 | 指數退避（1s→2s→4s，上限 60s）            | 避免無限 POST 轟炸                   |
| 內容大小     | 盡量 < 5KB                                | JSON 過大會觸發限制                  |
| 權限         | Demo 用 `Anyone`，正式請加 `token` 驗證   | 防止被外部濫用                       |
| 📄 Row 數上限 | 約 50000                                  | 太多會令 Sheet 緩慢                  |

## 5) 鷹架（學生操作卡）

**任務 A：Random 通路測試**

1. 將製作好的 `GAS_URL` 貼入程式。
2. 找出兩句關鍵語句：`http.addHeader("Content-Type", "application/json")`、`http.POST(payload)`。
3. 觀察 Sheet 是否新增一行數據。

**任務 B：換成溫濕度**

1. 只替換 payload 組裝；`device`、`value`、`extra` 三欄保持格式。
2. 在 Serial Monitor 顯示送出前的 payload，又回傳了甚麼。
3. Sheet 能否正確顯示？若否，回看 payload 是否為合法 JSON。

## 6) 常見錯誤與修正

| 現象                                                | 可能原因                              | 處理                                            |
| --------------------------------------------------- | ------------------------------------- | ----------------------------------------------- |
| `HTTP 405`                                          | 用了 GET 或 URL 非 `/exec`            | 改用 `POST`；確認 `/exec` 連結                  |
| `HTTP 401/403`                                      | Web App 權限不對                      | 部署時選 **Anyone**（Demo），或改為 token 驗證  |
| GAS 執行紀錄有 `TypeError: e.postData is undefined` | 未設 `Content-Type: application/json` | 在 ESP32 端加 `http.addHeader(...)`             |
| Sheet 無法寫入                                      | Sheet 名稱不符 / 欄位太多公式         | 確認 `ESP32_Data`；把寫入列放在不含公式的工作表 |

## 💬 延伸思考

> ✅ ESP32 以前係「問問題」：問天氣、問時間。
> ✅ 而家佢開始「答問題」：告訴世界「我量到咩數據」。

你有沒有發現，其實你不知不覺中，已在建立一個資料庫，下一步，你會怎樣運用這個資料庫？