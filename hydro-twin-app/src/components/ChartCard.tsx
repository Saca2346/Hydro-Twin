import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line } from 'recharts';

interface ChartCardProps {
  title: string;
  data: any[];
  xKey?: string;
  xTickFormatter?: (val: any) => string;
  yDomain?: [number | 'auto', number | 'auto'];
  yLabel?: string;
  lines: {
    key: string;
    name: string;
    color: string;
    strokeDasharray?: string;
    isDot?: boolean;
  }[];
  area?: {
    key: string;
    color: string;
  };
}

export function ChartCard({
  title,
  data,
  xKey = 'time',
  xTickFormatter,
  yDomain = ['auto', 'auto'],
  yLabel,
  lines,
  area,
}: ChartCardProps) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h2 className="chart-card-title">{title}</h2>
        <div className="chart-legend">
          {lines.map((line) => (
            <span key={line.key} className="chart-legend-item">
              <span
                className="chart-legend-line"
                style={{
                  background: line.color,
                  borderStyle: line.strokeDasharray ? 'dashed' : 'solid',
                }}
              />
              {line.name}
            </span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          {area && (
            <defs>
              <linearGradient id={`areaGrad-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={area.color} stopOpacity={0.15} />
                <stop offset="100%" stopColor={area.color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
          )}
          <CartesianGrid strokeDasharray="3 3" stroke="#D7E0EA" vertical={false} />
          <XAxis
            dataKey={xKey}
            tickFormatter={xTickFormatter}
            tick={{ fontSize: 11, fill: '#64748B' }}
            axisLine={{ stroke: '#D7E0EA' }}
            tickLine={false}
          />
          <YAxis
            domain={yDomain}
            tick={{ fontSize: 11, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
            label={yLabel ? { value: yLabel, position: 'insideTopLeft', offset: -5, style: { fontSize: 11, fill: '#64748B' } } : undefined}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #D7E0EA',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          {area && (
            <Area
              type="monotone"
              dataKey={area.key}
              stroke="none"
              fill={`url(#areaGrad-${area.key})`}
              fillOpacity={1}
              isAnimationActive={false}
            />
          )}
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              strokeDasharray={line.strokeDasharray}
              dot={line.isDot ? { fill: line.color, r: 3 } : false}
              connectNulls={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
