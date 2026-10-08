import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { TelemetryReading, HydrometricStation } from '../types/flood';
import { Activity } from 'lucide-react';

interface TelemetryChartProps {
  station: HydrometricStation;
  readings: TelemetryReading[];
  loading: boolean;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  station,
  readings,
  loading,
}) => {
  const chartData = React.useMemo(() => {
    return readings
      .map((r) => ({
        time: new Date(r.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fullDate: new Date(r.dateTime).toLocaleString(),
        value: r.value,
      }))
      .reverse();
  }, [readings]);

  const latestValue = readings.length > 0 ? readings[0].value : null;
  const highRange = station.stageScale?.typicalRangeHigh || 1.8;
  const isElevated = latestValue && latestValue > highRange;

  return (
    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Live Hydrometric Water Level Series (24h Trend)
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Station: <span className="text-cyan-300 font-semibold">{station.label}</span> ({station.stationReference})
          </p>
        </div>

        {latestValue !== null && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg">
            <span className="text-[11px] text-slate-400">Latest Level:</span>
            <span
              className={`text-sm font-extrabold font-mono ${
                isElevated ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {latestValue.toFixed(2)} m
            </span>
            {isElevated && (
              <span className="bg-rose-500/20 text-rose-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                High
              </span>
            )}
          </div>
        )}
      </div>

      {/* Recharts Area Container */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono">Fetching Live Telemetry Readings...</p>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono">
          No live telemetry readings returned for this station.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="waterLevelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(val: any) => [`${val} meters`, 'Water Level']}
                labelFormatter={(label, items) => {
                  if (items && items[0]) {
                    return `Time: ${items[0].payload.fullDate}`;
                  }
                  return label;
                }}
              />
              <ReferenceLine
                y={highRange}
                stroke="#f43f5e"
                strokeDasharray="4 4"
                label={{ value: 'Typical High', fill: '#f43f5e', fontSize: 10, position: 'top' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#waterLevelGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
