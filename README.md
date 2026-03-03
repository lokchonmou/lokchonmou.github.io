# LCM STUDIO（VitePress）

此 repo 正在由舊版靜態 HTML 網站遷移到 VitePress。

## 開發與預覽

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

## 部署

- 使用 GitHub Actions
- 觸發分支：`LCM-STUDIO-2.0`
- workflow：`.github/workflows/static.yml`

只要 push 到 `LCM-STUDIO-2.0`，會自動 build + deploy。

## 內容放置規則

- 文章：`docs/zh/**.md`、`docs/en/**.md`
- 靜態資源（圖片/影片/PDF）：`docs/public/**`
  - 例如：`docs/public/media/...`

## 遷移文件

- 遷移總覽：`docs/MIGRATION-STATUS.md`
- 遷移任務：`docs/MIGRATION-TASKS.md`
- 遷移檢查清單：`docs/MIGRATION-CHECKLIST.md`
- 自動進度報告：`docs/MIGRATION-PROGRESS.md`
- 盤點腳本：`tools/migration_progress.py`

## 交接與進度更新（重要）

每次搬運內容後，請固定做以下步驟：

1. 執行：`python3 tools/migration_progress.py`
2. 檢查 `docs/MIGRATION-PROGRESS.md`（自動更新）
3. 手動更新 `docs/MIGRATION-TASKS.md` 勾選項目
4. 如有策略變更，再更新 `docs/MIGRATION-STATUS.md`

`migration_progress.py` 會自動盤點：

- `docs/`、`docs/zh`、`docs/en` 的 Markdown 數量
- 舊站（docs 外）HTML 檔案數量
- 舊資料夾 vs 新 `docs/zh` 章節的對照進度
- Markdown 內 `/media/...` 引用與 `docs/public/media` 是否對齊

### 何時算「搬完」

可用以下條件判斷：

- `docs/MIGRATION-TASKS.md` 主要任務全勾選
- `docs/MIGRATION-PROGRESS.md` 顯示各章節已非「僅入口/待搬」
- 圖片/附件連結檢查無 404
- 線上站抽樣驗收通過後，才進行舊資料夾刪除
