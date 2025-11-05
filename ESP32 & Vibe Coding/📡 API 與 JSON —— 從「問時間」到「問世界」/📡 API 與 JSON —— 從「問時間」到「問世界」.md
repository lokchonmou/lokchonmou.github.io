# 📡 API 與 JSON —— 從「問時間」到「問世界」


## 1️⃣ 什麼是 API？（Application Programming Interface）

延續上一章的比喻——

> NTP Server 就係「世界時鐘局」，ESP32 向佢發出一個請求（Request），對方回覆咗一個答案（Response）。

**API** 其實就係「讓裝置同裝置溝通嘅標準說話方式」。
 你可以當佢係：

> 「一個程式可以問另一個程式嘅問題。」


### 💬 舉例

| 問題         | 伺服器                          | 回答內容         |
| ------------ | ------------------------------- | ---------------- |
| 幾點鐘？     | NTP Server                      | UTC 時間         |
| 今日天氣點？ | 天氣 API（例如 OpenWeatherMap） | 溫度、濕度、狀態 |
| 匯率幾多？   | 金融 API                        | 美金 / 港紙 匯率 |

ESP32 只要識得：
 1️⃣ 上網 →
 2️⃣ 發出請求（Request）→
 3️⃣ 收到資料（Response）→
 4️⃣ 解析資料 →
 就可以問「世界上任何公開 API」。

## 2️⃣ Request 與 Response：API 的骨幹

### 🚀 Request（請求）

一個 Request 通常包含：

- URL（伺服器位址，例如 `https://api.open-meteo.com/...`）
- 方法（常見係 `GET`）
- 可選參數（如城市名、經緯度）

```html
GET https://api.open-meteo.com/v1/forecast?latitude=22.2&longitude=113.5&current_weather=true
```



### 📦 Response（回應）

伺服器收到請求後，會回傳一段文字資料。
通常用 **JSON 格式**（JavaScript Object Notation）。



## 3️⃣ 什麼是 JSON？

JSON 就係一種結構化資料嘅表示方式，
讓人類同電腦都睇得明。

例子：

```json
{
  "latitude": 22.2,
  "longitude": 113.5,
  "current_weather": {
    "temperature": 28.7,
    "windspeed": 15.2,
    "weathercode": 1,
    "time": "2025-10-29T14:30"
  }
}
```

👉 我哋睇到：

- `current_weather` 入面有一組鍵值對（key-value pair）；

- 每個欄位都可直接喺程式中讀取，例如：

	```json
	doc["current_weather"]["temperature"]
	```


## 4️⃣ ESP32 點樣用 API？

ESP32 除咗連 Wi-Fi 同用 NTP，仲可以：

- 用 **HTTP Client** 函式庫（如 `HTTPClient.h`）；
- 發送 `GET` 請求；
- 用 `ArduinoJson` 解析回應。

```c++
HTTPClient http;
http.begin("https://api.open-meteo.com/v1/forecast?latitude=22.2&longitude=113.5&current_weather=true");
int httpCode = http.GET();
if (httpCode == 200) {
    String payload = http.getString();
    Serial.println(payload);
}
http.end();
```


## 5️⃣ 為什麼要學 JSON？

因為 **NTP 只會回時間，但 API 可以回任何資料**。

| 類型     | API                      | 可取得資料       |
| -------- | ------------------------ | ---------------- |
| 天氣     | OpenWeather / Open-Meteo | 溫度、濕度、風速 |
| 匯率     | ExchangeRate API         | 貨幣兌換比       |
| 日期時間 | WorldTime API            | 不同地區的時間   |
| 交通     | Transport API            | 公車、航班資料   |

## 🧠 延伸任務建議（自學鷹架）

學生可以延伸設計：

- **「Wi-Fi + API + JSON」實驗**
	 例如：讀取網上天氣 → 根據氣溫控制 LED 色溫；
- **「NTP + API 混合任務」**
	 例如：ESP32 每天早上 8:00 自動讀天氣並顯示；

## 🎓 小結

| 概念 | 功能                     | 類比             |
| ---- | ------------------------ | ---------------- |
| RTC  | 硬體時鐘，離線仍可記時間 | 手錶             |
| NTP  | 網絡對時服務             | 向世界時鐘問時間 |
| API  | 讓程式彼此溝通的語言     | 問問題           |
| JSON | 結構化資料格式           | 統一回信格式     |