import React from 'react';

type PanelProps = {
  title: string;
  children: React.ReactNode;
}

export default function Panel({ title, children }: PanelProps) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}