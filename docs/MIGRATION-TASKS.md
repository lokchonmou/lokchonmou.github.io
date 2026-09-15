# 新站整理及內容遷移計劃

> 本文件記錄已確認的取捨、完成進度與建議執行次序。最後更新：2026-09-15。

## 2026-09-15 收隊檢查點

- [x] 更新本任務清單及 `MIGRATION-PROGRESS.md`
- [x] 執行 production build；建置成功，沒有 dead links 或編譯錯誤
- [x] 實際操作五個遊戲互動展示，並修正 A*／Wavefront Reset 問題
- [x] 全面檢查「十個遊戲學編程」Markdown 實際渲染：修正 28 個缺空格標題及 13 個含空格圖片網址；瀏覽器逐篇驗證 22 頁
- [x] 修正「數值方法入門」列表內 LaTeX 被錯誤縮排成 code block；瀏覽器確認 24 個 MathJax 區塊正常渲染
- [x] 經用戶確認，準備 commit 及 push 到 GitHub 發佈

## 已確認方向

| 新站版塊 | 舊資料夾 | 決定 | 狀態 |
|---|---|---|---|
| CAD & CAM | `CAD & CAM/` | 已搬入全部需要內容；未完成而已下架的舊內容不再處理 | 已完成 |
| ESP32 & Vibe Coding | `ESP32 & Vibe Coding/` | 保留並搬入新版 | 待處理 |
| Projects | `Projects/` | 保留；目前只搬入 Line Following Robot，繼續補漏 | 進行中 |
| 十個遊戲學編程 | `gamming/` | 已搬入 22 篇文章、附件及 5 個互動展示；本版塊不再使用但保留搬運結果 | 已完成 |
| 幾何作圖 | `Construction of geometric figures/` | 保留，但舊結構不能直接套用遷移腳本；另行設計搬運方式 | 延後處理 |
| 互動模擬／展示 | `interactive/`、`portal/` | 保留；先盤點 p5.js 作品、portal 入口及外部 GitHub Pages 連結，再設計展示方式 | 延後處理 |
| 探索與隨筆 | `private research/` | 已搬入 5 篇文章；p5.js 點名器已歸入互動模擬／展示 | 已完成 |
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
- [ ] ESP32 & Vibe Coding：盤點並制定搬運次序
- [ ] Projects：搬入 Line Following Robot 以外的合適內容

### 第五步：處理需重新設計的舊內容

- [ ] 幾何作圖：分析舊文件結構，決定轉換規則或人工重整方式
- [ ] 幾何作圖：先做一篇原型，確認數式、圖像及版面後再批量處理
- [ ] 互動模擬／展示：盤點 `interactive/` 每個 p5.js 項目的依賴及啟動方式
- [ ] 互動模擬／展示：分析 `portal/` 兩個 HTML 內的本地項目及外部 GitHub Pages 連結
- [ ] 互動模擬／展示：決定採用 iframe、獨立靜態頁或重構為 VitePress 組件
- [ ] 互動模擬／展示：建立統一作品資料及展示卡片後再遷移

## 每一階段完成後的固定驗收

1. 執行 `python3 tools/migration_progress.py`
2. 執行 production build，確認沒有 broken links 或編譯錯誤
3. 本機抽查首頁、章節入口、文章、圖片、附件及互動頁
4. 更新本任務清單及遷移狀態文件
5. 確認變更內容後才 commit 及 push

## 暫不執行

- 未經逐步確認，不一次過刪除或搬運所有舊資料夾。
- `Construction of geometric figures/`、`interactive/` 與 `portal/` 暫時保留原狀。
- `private research/` 在文章分類及互動作品去向確認前，暫時保留原狀。
