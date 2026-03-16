# LCM STUDIO (VitePress) 🛸

這個 Repo 是 LCM STUDIO 的新版 VitePress 網站。所有開發與內容遷移應遵循以下流程。

## 🚀 快速開始

### 1. 啟動開發伺服器
進入目錄後，執行：
```bash
./start.sh
```
啟動後，你可以在瀏覽器打開：`http://localhost:5173/` 預覽網站。

### 2. 停止開發伺服器
執行：
```bash
./stop.sh
```

---

## 📦 內容遷移教學

如果你要從根目錄的舊資料夾（例如 `CAD & CAM/`）搬運內容到新站，請使用遷移腳本。**請勿直接在 `docs/` 手動建立檔案，除非你很熟悉架構。**

### 遷移腳本用法
```bash
./migrate_chapter.sh "<原始資料夾>" "<docs目的地>" "[章節名稱]" "[URL前綴]"
```

**範例：**
```bash
./migrate_chapter.sh "CAD & CAM/真。3D繪圖測試" "docs/zh/cad-cam/" "真。3D繪圖測試" "/media"
```

*   **第 1 參數**: 舊站資料夾路徑。
*   **第 2 參數**: `docs` 內的存放路徑。建議 `docs/zh/...`。
*   **第 3 參數**: 媒體資料夾名稱。圖片會被搬到 `docs/public/media/<章節名稱>`。
*   **第 4 參數**: 圖片網址前綴，固定用 `/media` 即可。

---

## 🛠️ 開發日常流程 (Daily Workflow)

1.  **修改舊檔**: 在原始資料夾（如 `CAD & CAM/...`）修改 `.md` 檔案。
2.  **執行遷移**: 再次執行 `./migrate_chapter.sh ...` 將修改同步到 `docs/`。
3.  **預覽**: 在 `http://localhost:5173/` 查看結果。
4.  **更新選單**: 如果是新章節，需要手動編輯 `docs/zh/cad-cam/index.md` 或相關的 `index.md` 加入連結。

---

## ❓ 常見問題 (Q&A)

### 為什麼我更新了 `.md` 但網站沒變？
*   檢查你修改的是否是 `docs/` 內的檔案。
*   如果你修改的是根目錄下的舊資料夾，記得要跑 `migrate_chapter.sh` 同步過去。

### 為什麼出現 404？
*   檢查路徑名稱是否包含特殊字元（如空格、括號）。腳本會盡力處理，但建議檔名簡單一點。
*   檢查 `index.md` 內的連結檔名是否跟 `docs/` 內的實際檔名一致。

---

## 📈 遷移進度追蹤
每次執行完遷移，請跑一下進度盤點腳本：
```bash
python3 tools/migration_progress.py
```
這會更新 `docs/MIGRATION-PROGRESS.md`。
