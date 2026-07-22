# Rain AI Project 公式ランディングページ

**熊本発・多脳層AI開発「Rain AI Project」の公式Webサイトです。**

- 公開URL: https://www.rainaiproject.com/
- ホスティング: Vercel
- 構成: 静的HTML / CSS / JavaScript / Vercel Functions（AIチャット）
- 目的: サービス紹介、プロダクト紹介、無料相談への導線

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 公式ランディングページ |
| `kumamoto-ai-guide.html` | 熊本の中小企業向けAI導入ガイド（SEO支援記事） |
| `kumamoto-ai-diagnosis.html` | 登録不要の熊本企業向けAI導入セルフ診断 |
| `blog.html` | 熊本のAI・DXブログ一覧 |
| `blog/kumamoto-ai-2026.html` | 熊本県の最新DX調査を解説するブログ記事 |
| `SEO-CONTENT-PLAN.md` | 「熊本 AI」向けブログの更新方針と記事計画 |
| `privacy.html` | プライバシーポリシー |
| `terms.html` | 利用規約 |
| `robots.txt` | 検索・AIクローラー設定 |
| `sitemap.xml` | 検索エンジン向けサイトマップ |
| `vercel.json` | VercelのURL設定 |
| `chatbot.js` | LP右下の相談チャットウィジェット |
| `api/chat.js` | OpenAI Responses APIへ接続するVercel Function |
| `server.mjs` | ローカル確認用サーバー |

## ローカル確認

APIキーはGit管理外の `.env.local` に保存し、次のコマンドで起動します。

```bash
npm run dev
```

ブラウザで `http://127.0.0.1:3000` を開きます。会話内容はRain AI独自のデータベースには保存せず、回答生成時のみOpenAI APIへ送信します。

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
