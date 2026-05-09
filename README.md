# BUKUMANGA

BUKUMANGA の公開用フロントエンドリポジトリです。  
現行サービス全体の closed なコードベースとは分けて、公開して問題ない Web クライアント部分を切り出しています。

Vite + React で構成されており、API は別途稼働している BUKUMANGA API を参照します。

## 開発

依存関係を入れたあと、必要に応じて `VITE_API_URL` を指定して起動します。

```bash
bun install
VITE_API_URL=http://localhost:8787 bun run dev
```

未指定時は `http://localhost:8787` を使います。

## 主要コマンド

```bash
bun run typecheck
bun run lint:ci
bun run format:ci
bun run build
```

## デプロイ

Cloudflare Workers Assets を使って配信する想定です。

```bash
bun run deploy
```

production の API 接続先はビルド時に `VITE_API_URL` で切り替えてください。
