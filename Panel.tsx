import React from 'react';
import { panelStyles } from './styles';

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export function Panel({ title, children }: PanelProps) {
  return (
    <div style={panelStyles.container}>
      <h3 style={panelStyles.title}>{title}</h3>
      {children}
    </div>
  );
}