import React from 'react';

// アプリ全体のコンテナとヘッダー
export const appStyles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '0 16px',
    fontFamily: 'sans-serif'
  } as React.CSSProperties,
  header: {
    fontSize: '1.4em',
    margin: '0 0 24px 0',
    borderBottom: '1px solid #333',
    paddingBottom: '8px'
  } as React.CSSProperties
};

// 共通パネル外枠
export const panelStyles = {
  container: {
    margin: '16px 0',
    padding: '12px 0',
    borderTop: '1px solid #ddd'
  } as React.CSSProperties,
  title: {
    margin: '0 0 12px 0',
    fontSize: '1.1em',
    color: '#555'
  } as React.CSSProperties
};

// 集計・フィルター・リスト表示
export const subStyles = {
  summaryText: (hasOverdue: boolean) => ({
    margin: 0,
    fontSize: '0.95em',
    color: '#444'
  } as React.CSSProperties),
  overdueCount: (hasOverdue: boolean) => ({
    color: hasOverdue ? '#d9383a' : 'inherit',
    fontWeight: 'bold'
  } as React.CSSProperties),
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '0.9em'
  } as React.CSSProperties,
  filterRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  } as React.CSSProperties,
  select: {
    padding: '2px 4px',
    marginLeft: '4px'
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  } as React.CSSProperties,
  checkbox: {
    marginRight: '4px'
  } as React.CSSProperties,
  sortButton: {
    padding: '2px 8px',
    cursor: 'pointer'
  } as React.CSSProperties,
  emptyText: {
    color: '#999',
    fontSize: '0.9em',
    margin: 0
  } as React.CSSProperties,
  list: {
    padding: 0,
    margin: 0
  } as React.CSSProperties,
  listItem: (done: boolean) => ({
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
    listStyle: 'none',
    opacity: done ? 0.5 : 1
  } as React.CSSProperties),
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  } as React.CSSProperties,
  itemLabel: (done: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1
  } as React.CSSProperties),
  itemCheckbox: {
    marginRight: '8px'
  } as React.CSSProperties,
  itemText: (done: boolean) => ({
    textDecoration: done ? 'line-through' : 'none'
  } as React.CSSProperties),
  itemMeta: {
    fontSize: '0.85em',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  } as React.CSSProperties,
  overdueBadge: {
    color: '#d9383a',
    fontWeight: 'bold'
  } as React.CSSProperties,
  deleteButton: {
    border: 'none',
    background: 'none',
    color: '#d9383a',
    cursor: 'pointer',
    padding: '0 4px'
  } as React.CSSProperties,
  memoText: {
    margin: '2px 0 0 24px',
    fontSize: '0.8em',
    color: '#777'
  } as React.CSSProperties
};

// タスク追加フォーム
export const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.9em'
  } as React.CSSProperties,
  row: {
    display: 'flex',
    gap: '8px'
  } as React.CSSProperties,
  titleField: {
    flex: 1
  } as React.CSSProperties,
  assigneeField: {
    width: '100px'
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '4px'
  } as React.CSSProperties,
  errorText: {
    color: '#d9383a',
    fontSize: '0.85em'
  } as React.CSSProperties,
  metaRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  } as React.CSSProperties,
  radioLabel: {
    marginRight: '8px'
  } as React.CSSProperties,
  submitRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  } as React.CSSProperties,
  submitButton: {
    padding: '4px 16px',
    cursor: 'pointer'
  } as React.CSSProperties
};