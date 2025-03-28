import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface ChartProps {
  data: DataPoint[];
  title?: string;
  type?: 'bar' | 'line';
  height?: number;
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  title,
  type = 'bar',
  height = 200,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-fill-tsp-white-dark rounded-lg p-4 ${className}`} style={{ height }}>
        <p className="text-text-secondary text-sm">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`bg-fill-white rounded-lg p-4 ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-text-primary mb-4">{title}</h3>
      )}
      
      <div className="flex flex-col" style={{ height: `${height}px` }}>
        {type === 'bar' ? (
          <div className="flex items-end h-full gap-2">
            {data.map((point, index) => {
              const percentage = (point.value / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex justify-center mb-1">
                    <span className="text-xs text-text-secondary">{point.value}</span>
                  </div>
                  <div 
                    className="w-full bg-icon-brand rounded-t"
                    style={{ height: `${percentage}%`, minHeight: '4px' }}
                  ></div>
                  <div className="w-full text-center mt-1">
                    <span className="text-xs text-text-tertiary truncate">{point.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative h-full">
            {/* Line chart implementation */}
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Y-axis grid lines */}
              {[0, 25, 50, 75, 100].map((tick) => (
                <g key={tick}>
                  <line
                    x1="0"
                    y1={`${100 - tick}%`}
                    x2="100%"
                    y2={`${100 - tick}%`}
                    stroke="#E9ECEF"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y={`${100 - tick}%`}
                    dx="-5"
                    dy="3"
                    fontSize="10"
                    textAnchor="end"
                    fill="#6C757D"
                  >
                    {Math.round((maxValue * tick) / 100)}
                  </text>
                </g>
              ))}
              
              {/* Line chart */}
              <polyline
                points={data
                  .map((point, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - (point.value / maxValue) * 100;
                    return `${x}%,${y}%`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#0D6EFD"
                strokeWidth="2"
              />
              
              {/* Data points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - (point.value / maxValue) * 100;
                return (
                  <g key={index}>
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="#0D6EFD"
                    />
                    <text
                      x={`${x}%`}
                      y="100%"
                      dy="15"
                      fontSize="10"
                      textAnchor="middle"
                      fill="#6C757D"
                    >
                      {point.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};