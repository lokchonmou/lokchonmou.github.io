# Three.js 初探v2

Three.js 是一個跨瀏覽器的 JavaScript 函式庫，用於在網頁瀏覽器中創建和展示動畫的三維電腦圖形。它使用 WebGL，這是一個由瀏覽器支援的 API，允許 JavaScript 直接訪問 GPU。

three.js 提供了一個廣泛的功能，可用於創建各種三維內容，包括：基本形狀和物體、模型和場景、光照和陰影、材質和紋理、動畫和互動；它是一種流行的工具，可用於創建各種三維應用，包括：遊戲、虛擬現實和擴增實境、可視化、教育和藝術；

[TOC]

## 安裝及準備

1. 開啟visual studio code
2. 開一個新的專案資料夾
3. 在vs code的Terminal[^1]輸入`npm init -y`
  1. npm init -y` 命令用於初始化一個新的 Node.js 專案。它會在您當前目錄中創建一個 `package.json` 檔案，該檔案包含您的專案的資訊，例如名稱、版本、描述和依賴項。
4. 輸入`npm install vite`
5. 在專案資料夾建立一個`index.html`檔案
6. 在`index.html`中只要輸入`html`，選`html5`，就會出現html的基本預設
7. 將`title` 改為適當名字
8. 在`<body>`中，加係`<h1>My first three js test</h1>`
9. 開啟專案資料夾中的`package.json`，將`script`部分修改為：
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  ```
  - 在terminal輸入`npm run`時，就會`run`上面這再個`script`
10. 在terminal輸入: `npm run dev`，這時就會運行`vite`
11. 這時會彈出一個localhost的地址，按`ctrl`按下這個地址就會開啟，你就會見到網頁內容

## 開始寫js

- 在專案資料夾建立一個`script.js`
- 在內容加入以下內容測試:
``` javascript
console.log('Hello World')
```
- 在`index.html`中，在`<body>`加入`<script>`如下:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>First Three Js</title>
</head>
<body>
    <h1>My first three js test</h1>
    <script src="./script.js" type="module"></script>
</body>
</html>
```

- 可以返回網頁，按`option + cmd + i`，就可以開啟開發人員工具，見到`Hello World`