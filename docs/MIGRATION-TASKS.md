# 新站整理及內容遷移計劃

> 本文件記錄已確認的取捨、完成進度與建議執行次序。最後更新：2026-09-16。

## 2026-09-15 收隊檢查點

- [x] 更新本任務清單及 `MIGRATION-PROGRESS.md`
- [x] 執行 production build；建置成功，沒有 dead links 或編譯錯誤
- [x] 實際操作五個遊戲互動展示，並修正 A*／Wavefront Reset 問題
- [x] 全面檢查「十個遊戲學編程」Markdown 實際渲染：修正 28 個缺空格標題及 13 個含空格圖片網址；瀏覽器逐篇驗證 22 頁
- [x] 修正「數值方法入門」列表內 LaTeX 被錯誤縮排成 code block；瀏覽器確認 24 個 MathJax 區塊正常渲染
- [x] 經用戶確認，準備 commit 及 push 到 GitHub 發佈

## 2026-09-16 ESP32 搬運檢查點

- [x] 確認「幾何作圖」為舊版 Rhino 教學草稿，其內容已併入 CAD & CAM
- [x] 移除「幾何作圖」中英文空入口及獨立進度追蹤
- [x] 搬入 ESP32 & Vibe Coding 全部 10 篇文章（包括參考答案及延伸閱讀）
- [x] 搬入 45 個圖片、PDF、DOCX 及 GIF 附件
- [x] 搬入搶答機互動展示及「時間的追逐」延伸頁
- [x] 建立章節次序，修正附件、舊 HTML 內鏈及缺空格標題
- [x] 執行 production build；建置成功，沒有 dead links 或編譯錯誤
- [x] 實際開啟 ESP32 入口、Vibe Coding、NTP 及「時間的追逐」頁面驗收
- [x] 再次逐檔核對搶答機 p5.js 原檔、函式庫及文章嵌入路徑；鎖定／Reset 邏輯完整
- [x] 在 Chrome 實際操作搶答機：確認紅／綠搶答、鎖定其他按鈕及 Reset 開啟下一輪正常

## 2026-09-16 Projects 搬運檢查點

- [x] 搬入 `ESP32 + WS2812 Clock`，並將舊稿內 Wi-Fi 資料改成公開範例 placeholder
- [x] 搬入「甘特圖製作」及 25 張圖片
- [x] 更新 Projects 入口，現有 3 個內容單元已全部列出
- [x] 執行 production build；內容及資源建置成功

## 2026-09-16 互動模擬／展示搬運檢查點

- 舊 `interactive/` 共 19 個作品資料夾，另有一個共用 `libraries/` 資料夾。
- 已進入新站：A*、Breakout、Pong、Maze Generator、Wavefront、點名器及搶答機；「時間的追逐」亦已作獨立互動頁加入。
- 尚未進入新站入口：Artillery、FlappyBirdAI、Sudoku、Boundary Game、Cat & Rat、Line Follower Sim、Noise Generator、Planet Simulator、Resistor Color Code、Tic-tac-toe、平面坐標系兩點距離、點線面關係。
- `portal/showcase.html` 另列一個外部「投影互動教材」。
- `portal/tools.html` 列出五個外部工具：PDF Noteshrink、PDF Combine / Split、Halftone Generator、Duty Scheduler、StatPlot；點名器則已搬入本地。
- 依賴風險：部分作品使用 CDN p5.js；Line Follower Sim 同時有錯誤的 `library/` 路徑及外部 p5.gui／QuickSettings；有本地 p5.js 的作品每個約 1.1–1.2 MB，應統一共用，避免重複。
- 建議展示結構：同一個「互動模擬／展示」入口，分為「教學與演算法」、「遊戲與模擬」、「實用工具」三組卡片；本地作品以獨立靜態頁開啟，外部作品保留外連，不把大型 canvas 強塞進 VitePress 文章 iframe。
- [x] 用戶確認上述收錄清單、分類及展示方式後完成搬運
- [x] 搬入 12 個尚未收錄的本地作品，新站合共有 20 個本地互動頁；「時間的追逐」歸入探索與隨筆
- [x] 建立三組響應式展示卡片，並保留 6 個外部作品連結
- [x] 修正 Tic-tac-toe 使用保留字 `eval` 所造成的 strict-mode 語法錯誤
- [x] 修正目錄 URL 被 VitePress fallback 接管的問題，20 個本地連結全部改用明確 `index.html`
- [x] 將「互動模擬／展示」卡片加入繁中及英文主頁
- [x] 逐一確認 20 個 `index.html` 回傳真正作品內容而非 VitePress fallback；production build 成功
- [x] 修正 Line Follower Simulator 已失效的外部 p5.gui／QuickSettings 依賴，改用本地函式庫並在 Chrome 實際確認模擬及控制介面運行

## 已確認方向

| 新站版塊 | 舊資料夾 | 決定 | 狀態 |
|---|---|---|---|
| CAD & CAM | `CAD & CAM/` | 已搬入全部需要內容；未完成而已下架的舊內容不再處理 | 已完成 |
| ESP32 & Vibe Coding | `ESP32 & Vibe Coding/` | 已搬入 10 篇文章、45 個附件及 2 個互動頁 | 已完成 |
| Projects | `Projects/` | 已搬入現有 3 個內容單元及所需附件 | 已完成 |
| 十個遊戲學編程 | `gamming/` | 已搬入 22 篇文章、附件及 5 個互動展示；本版塊不再使用但保留搬運結果 | 已完成 |
| 幾何作圖 | `Construction of geometric figures/` | 經核對為舊版 Rhino 教學草稿；完整內容已併入 CAD & CAM | 已完成 |
| 互動模擬／展示 | `interactive/`、`portal/` | 已整理為三組卡片；19 個本地作品及 6 個外部作品已加入入口 | 已完成 |
| 探索與隨筆 | `private research/` | 已搬入 5 篇文章及「時間的追逐」互動頁；p5.js 點名器已歸入互動模擬／展示 | 已完成 |
| Arduino × Processing | `arduinoXprocessing/` | 已棄用；舊資料夾及新站空入口已移除 | 已完成 |
| Math & Robotics | `math&robotics/` | 舊內容已棄用及移除；日後重寫 | 已完成 |
| Processing 專區 | `processing/` | 已棄用；舊資料夾及新站空入口已移除 | 已完成 |

## 命名決定：探索與隨筆

`private research/` 現有內容包括：

- AI 寫作與 AI 編程產業觀察
- Three.js 初探
- 數值方法與單擺模擬
- 立體機動裝置分析
- p5.js 點名器

內容同時有技術實驗、研究筆記及個人觀察，因此新版建議使用「探索與隨筆」，比「其他研究」自然，亦比單純「雜談」更能反映技術內容。

## 建議執行次序

### 第一步：清理已確定棄用的內容

- [x] 刪除舊資料夾 `arduinoXprocessing/`
- [x] 移除新站 `arduino-processing` 空入口及英文對應入口
- [x] 刪除舊資料夾 `math&robotics/`
- [x] 移除新站 `math-robotics` 空入口及英文對應入口
- [x] 刪除舊資料夾 `processing/`
- [x] 移除新站 `processing` 空入口及英文對應入口
- [x] 全站搜尋上述路徑，清除首頁、導覽、腳本及文件內的失效引用

### 第二步：整理「十個遊戲學編程」

- [x] 將新站顯示名稱由「遊戲編程」改為「十個遊戲學編程」
- [x] 保留 URL slug `game-coding`
- [x] 盤點 `gamming/` 的十個遊戲、文章結構、圖片及程式附件
- [x] 制定章節次序及檔名對照
- [x] 搬入及驗證 22 篇文章、265 個附件與 5 個互動展示
- [x] 修正舊內鏈、iframe、缺圖及 Markdown 問題
- [x] 實際開啟及操作 Pong、Breakout、A*、Wavefront、Maze Generator
- [x] 修正 A* 與 Wavefront 每次 Reset 重複產生控制項的問題，並同步修正舊來源
- [x] 逐篇檢查標題、圖片及其他 Markdown 是否實際渲染，而非只以 build／dead-link 結果判定成功
- [x] 按用戶決定保留現有搬運結果，本版塊工作完成；舊來源暫時保留

### 第三步：整理「探索與隨筆」

- [x] 將首頁及章節名稱由「其他研究」改為「探索與隨筆」
- [x] 保留 URL slug `private-research`
- [x] 將 5 篇文章內容轉成 VitePress Markdown
- [x] 搬運文章所需圖片、Python 範例及其他附件
- [x] 將 Three.js 初探確認為教學筆記並搬入文章區
- [x] 將 p5.js 點名器搬入 `docs/public/interactive/roll-call/`，並加入互動模擬／展示入口
- [x] 實際檢查「數值方法入門」數式，修正 Euler／RK2／RK4 公式縮排並同步舊來源
- [x] 決定點名器併入「互動模擬／展示」
- [x] 探索與隨筆搬運完成；舊來源暫時保留

### 第四步：補完現有核心版塊

- [x] CAD & CAM：核對新舊文章清單，找出 5 個未搬內容單元
- [x] CAD & CAM：用既有遷移腳本搬入兩篇 Rhinoceros 教學，放於最後一章
- [x] CAD & CAM：搬入 `3D打印時鐘`，加入 CAD X Real World
- [x] CAD & CAM：搬入 `Line Following Robot CAD`，放於 Sumo Robot 之後
- [x] CAD & CAM：搬入 `真。3D繪圖測試`，保留頁面檔案但不加入章節入口
- [x] CAD & CAM：用戶已檢視並確認本章完成；未完成而已下架的舊內容不再搬運
- [x] ESP32 & Vibe Coding：完成盤點、搬運、章節編排、附件修正及互動頁驗收
- [x] Projects：搬入 ESP32 + WS2812 Clock 及甘特圖製作，連同 Line Following Robot 完成現有 3 個內容單元

### 第五步：處理需重新設計的舊內容

- [x] 幾何作圖：核對後確認為 `Introduction of Rhinoceros` 及其幾何練習的舊版草稿
- [x] 幾何作圖：完整內容已收錄於 CAD & CAM，移除中英文空入口及獨立搬運任務
- [x] 互動模擬／展示：盤點 `interactive/` 每個作品的依賴及啟動方式
- [x] 互動模擬／展示：分析 `portal/` 兩個 HTML 內的本地項目及外部 GitHub Pages 連結
- [x] 互動模擬／展示：採用 VitePress 分類卡片入口，本地作品以獨立靜態頁開啟，外部作品保留外連
- [x] 互動模擬／展示：建立「教學與演算法」、「遊戲與模擬」、「實用工具」三組展示卡片並完成遷移

## 每一階段完成後的固定驗收

1. 執行 `python3 tools/migration_progress.py`
2. 執行 production build，確認沒有 broken links 或編譯錯誤
3. 本機抽查首頁、章節入口、文章、圖片、附件及互動頁
4. 更新本任務清單及遷移狀態文件
5. 確認變更內容後才 commit 及 push

## 下一階段：建立全站英文版本

- [ ] 盤點繁中與英文頁面對照，建立完整翻譯清單及固定 URL 對照
- [ ] 翻譯 CAD & CAM 全章，保留程式碼、圖片、影片及附件路徑
- [ ] 翻譯 ESP32 & Vibe Coding 全章
- [ ] 翻譯十個遊戲學編程全章
- [ ] 翻譯 Projects、探索與隨筆及互動模擬／展示入口
- [ ] 檢查語言切換按鈕在每個中英文對應頁均可正確互跳
- [ ] 逐章執行 production build、dead-link 檢查及瀏覽器抽樣驗收

## 暫不執行

- 未經逐步確認，不一次過刪除或搬運所有舊資料夾。
- `interactive/` 與 `portal/` 舊來源暫時保留作對照。
- `private research/` 在文章分類及互動作品去向確認前，暫時保留原狀。
