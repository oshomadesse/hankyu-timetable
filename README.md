# 🚃 阪急電車 梅田⇔十三 乗車案内アプリ

阪急電車の梅田駅と十三駅の時刻表を表示するWebアプリです。

## 機能

- 梅田⇔十三の2方向切替
- 現在時刻の表示
- 次の3本の電車を表示
- 路線別色分け（京都線・神戸線・宝塚線）
- プラットフォーム番号、種別、行先表示
- 平日/土日祝の自動判定
- スマホ対応レスポンシブデザイン

## プロジェクト構造

```
🚃 train-timetable/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── app.js         # アプリケーションロジック
├── data/
│   ├── weekday.json   # 平日時刻表
│   └── weekend.json   # 土日祝時刻表
└── README.md          # このファイル
```

## 使い方

1. ローカルで確認する場合は `index.html` を開く
2. GitHub Pagesで公開する場合は下記の手順を参照

## GitHub Pagesでの公開手順

1. GitHubでリポジトリを作成（例: `hankyu-timetable`）

2. ローカルでGit初期化とプッシュ
```bash
cd "/Users/seihoushouba/Documents/Oshomadesse-pc/11_Engineering/🚃 train-timetable"
git init
git add .
git commit -m "Initial commit: Hankyu timetable app"
git branch -M main
git remote add origin https://github.com/[ユーザー名]/hankyu-timetable.git
git push -u origin main
```

3. GitHub Pagesを有効化
   - リポジトリの Settings > Pages
   - Source: `main` branch / `root`
   - 数分後に `https://[ユーザー名].github.io/hankyu-timetable/` で公開

## データ更新方法

時刻表データを更新する場合は、以下のファイルを編集してください。

- `data/weekday.json` - 平日の時刻表
- `data/weekend.json` - 土日祝の時刻表

### JSONフォーマット

```json
{
  "umeda_to_juso": [
    {
      "time": "06:00",
      "line": "kyoto",
      "platform": "1",
      "type": "普通",
      "destination": "河原町"
    }
  ],
  "juso_to_umeda": [
    {
      "time": "06:05",
      "line": "kyoto",
      "platform": "3",
      "type": "特急",
      "destination": "梅田"
    }
  ]
}
```

#### 路線の指定

- `kyoto` - 京都線（緑色）
- `kobe` - 神戸線（青色）
- `takarazuka` - 宝塚線（オレンジ色）

## 今後の拡張案

- 祝日カレンダーAPIの導入
- リアルタイム遅延情報の表示
- PWA化（オフライン対応）
- 他の駅・路線への展開

## ライセンス

MIT License
