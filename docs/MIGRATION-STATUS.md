# 遷移狀態總覽（VitePress）

> 最後更新：2026-03-04

## 你現在的架構

此 repo 目前是「新站 + 舊站」並存：

- **新站（已上線）**：VitePress
  - 內容根目錄：`docs/`
  - 設定：`docs/.vitepress/config.ts`
  - 首頁（繁中）：`docs/zh/index.md`
- **自動部署**：GitHub Actions
  - workflow：`.github/workflows/static.yml`
  - 觸發分支：`LCM-STUDIO-2.0`
  - 部署輸出：`docs/.vitepress/dist`
- **舊站內容**：repo 根目錄多個舊資料夾（大量 `.html`）

## 日常上線流程（之後照這個做）

1. 在 `docs/` 下新增或修改 `.md`
2. 圖片/影片/PDF 等資源放到 `docs/public/`（如 `docs/public/media/...`）
3. `git add .`
4. `git commit -m "..."`
5. `git push origin LCM-STUDIO-2.0`

GitHub Actions 會自動 build + deploy，你本機不用每次手動 build。

## 本機預覽（可選）

- 開發預覽：`npm run dev`
- 生產建置檢查：`npm run build`

## 搬完後建議保留

- `.github/`
- `docs/`
- `package.json`
- `package-lock.json`
- `.gitignore`

## 搬完後可刪（確認內容已搬到 docs 後）

- 舊站根目錄內容，例如：
  - `CAD & CAM/`
  - `ESP32 & Vibe Coding/`
  - `arduinoXprocessing/`
  - `gamming/`
  - `interactive/`
  - `math&robotics/`
  - `private research/`
  - `processing/`
  - `Projects/`
  - 以及舊 `index.html`、舊 `assets/`、舊 `libraries/` 等

## 注意事項

- 你的 Markdown 目前大量使用 `/media/...` 路徑；對應資源必須在 `docs/public/media/...` 存在。
- 清舊資料前，先跑一次遷移盤點腳本（`tools/migration_progress.py`）確認缺漏。
- 若上線異常，先檢查 Actions run 與 `github-pages` environment branch policy。

## `migration_progress.py` 會做什麼

腳本路徑：`tools/migration_progress.py`

每次執行 `python3 tools/migration_progress.py`，會重新產生：`docs/MIGRATION-PROGRESS.md`。

輸出重點包含：

- `docs/`、`docs/zh`、`docs/en` Markdown 數量
- 舊站（docs 外）HTML 檔案數
- 舊資料夾對照新章節（`arduinoXprocessing -> arduino-processing` 等）
- Markdown 使用的 `/media/...` 與 `docs/public/media/...` 是否缺漏

## 交接規範（給你 / 下一手 AI）

每次搬運後，請固定更新這兩份：

1. `docs/MIGRATION-PROGRESS.md`（自動，透過腳本）
2. `docs/MIGRATION-TASKS.md`（手動勾選）

若搬運策略或保留清單有改動，再更新本檔 `docs/MIGRATION-STATUS.md`。

## 完工判定（Done）

同時滿足以下條件才算搬完：

- `docs/MIGRATION-TASKS.md` A-D 區塊完成
- `docs/MIGRATION-PROGRESS.md` 章節狀態不再是「僅入口/待搬」
- 線上抽樣驗收無 404 圖片/附件
- 已完成一次「刪除舊站資料夾前」備份或可回滾方案

## 相關文件

- 遷移檢查清單：`docs/MIGRATION-CHECKLIST.md`
- 自動進度報告：`docs/MIGRATION-PROGRESS.md`
- 盤點腳本：`tools/migration_progress.py`
