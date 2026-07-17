# Rain AI Project 公式ランディングページ

**熊本発・多脳層AI開発「Rain AI Project」の公式Webサイトです。**

- 公開URL: https://www.rainaiproject.com/
- ホスティング: Vercel
- 構成: 静的HTML / CSS / JavaScript
- 目的: サービス紹介、プロダクト紹介、無料相談への導線

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 公式ランディングページ |
| `privacy.html` | プライバシーポリシー |
| `terms.html` | 利用規約 |
| `robots.txt` | 検索・AIクローラー設定 |
| `sitemap.xml` | 検索エンジン向けサイトマップ |
| `vercel.json` | VercelのURL設定 |

## デプロイ

このリポジトリの `main` ブランチをVercelへ接続して公開します。

`vercel.json` の `cleanUrls` により、規約ページは次のURLで公開されます。

- https://www.rainaiproject.com/privacy
- https://www.rainaiproject.com/terms

## 更新時の確認

1. PCとスマートフォンで表示崩れがないこと
2. 「無料相談」リンクが正しく動作すること
3. canonical、OGP、構造化データが `www.rainaiproject.com` を参照していること
4. `sitemap.xml` と実際の公開URLが一致していること

© 2026 Rain AI Project
