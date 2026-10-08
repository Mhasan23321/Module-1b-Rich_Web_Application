import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { CrimeStreetIncident } from '../types/police';
import { ShieldAlert } from 'lucide-react';

interface CrimeBreakdownChartProps {
  crimes: CrimeStreetIncident[];
  loading: boolean;
  lat: number;
  lng: number;
}

const COLORS = [
  '#38bdf8',
  '#fb7185',
  '#facc15',
  '#4ade80',
  '#c084fc',
  '#f97316',
  '#2dd4bf',
  '#a855f7',
];

export const CrimeBreakdownChart: React.FC<CrimeBreakdownChartProps> = ({
  crimes,
  loading,
  lat,
  lng,
}) => {
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    crimes.forEach((c) => {
      const cat = c.category.replace(/-/g, ' ');
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [crimes]);

  return (
    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Localized Public Safety Incident Distribution (1 Mile Radius)
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Coordinates: <span className="font-mono text-slate-300">{lat.toFixed(4)}, {lng.toFixed(4)}</span> | Total Incidents:{' '}
            <span className="font-semibold text-emerald-300">{crimes.length}</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-56 flex flex-col items-center justify-center text-slate-400 gap-2">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono">Querying UK Police Street Crime API...</p>
        </div>
      ) : categoryCounts.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-slate-500 text-xs font-mono">
          No recent street crime incidents recorded within 1 mile of this coordinate.
        </div>
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryCounts} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fontSize: 9 }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(val: any) => [`${val} incidents`, 'Count']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {categoryCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
