# TeamTasks (タスク管理アプリケーション)

React + TypeScript + React Hook Form + Yup で構築されたタスク管理アプリケーションです。

---

## 起動手順

ローカル環境でアプリケーションを起動するための手順です。パッケージマネージャーには `pnpm` を使用します。

### 1. 依存パッケージのインストール
```bash
pnpm install
```

### 2. 開発サーバーの起動
```bash
pnpm dev
```

### テスト実行手順
```bash
pnpm test
```

## 　コンポーネント構成図
```
App.tsx 
 ├── taskUtils.ts 
 │
 ├── TaskSummary.tsx 
 ├── TaskFilter.tsx 
 ├── TaskList.tsx 
 │    └── TaskItem.tsx 
 └── TaskForm.tsx 
      ├── taskSchema.ts 
      └── Panel.tsx 
```

## 担当箇所
- 青木：TaskItem.tsx,TaskList.tsx
- 竹内：TaskForm.tsx,taskSchema.ts
- 高橋：TaskFilter.tsx,TaskSummary.tsx
- 木村：TaskUtils.ts,App.tsx
