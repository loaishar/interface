import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value = 0, 
  max = 100, 
  className = '', 
  ...props 
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-[var(--fill-tsp-white-dark)] ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-[var(--icon-brand)] transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
};