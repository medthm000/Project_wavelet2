import { ReactNode } from 'react';

interface FormulaBoxProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function FormulaBox({ children, title, className = '' }: FormulaBoxProps) {
  return (
    <div className={`bg-gray-900/60 border border-electric-blue/30 rounded-lg p-4 backdrop-blur-sm ${className}`}>
      {title && (
        <div className="text-electric-blue text-sm font-semibold mb-2">{title}</div>
      )}
      <div className="font-mono text-gray-300 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
