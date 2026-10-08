import React from 'react';
import { AlertTriangle, Flame, Droplets, ShieldCheck, Cpu } from 'lucide-react';
import { FloodWarning, HydrometricStation } from '../types/flood';
import { PoliceForce } from '../types/police';

interface StatSummaryCardsProps {
  warnings: FloodWarning[];
  stations: HydrometricStation[];
  policeForces: PoliceForce[];
  onSelectSeverity: (level: string) => void;
}

export const StatSummaryCards: React.FC<StatSummaryCardsProps> = ({
  warnings,
  stations,
  policeForces,
  onSelectSeverity,
}) => {
  const severeCount = warnings.filter((w) => w.severityLevel === 1).length;
  const warningCount = warnings.filter((w) => w.severityLevel === 2).length;
  const alertCount = warnings.filter((w) => w.severityLevel === 3).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Severe Warnings Card */}
      <div
        onClick={() => onSelectSeverity('1')}
        className="cursor-pointer bg-slate-900/90 dark:bg-slate-900/90 border border-rose-500/30 hover:border-rose-500/60 p-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Severe Flood Risk</p>
            <p className="text-2xl font-black text-rose-100 mt-1">{severeCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Danger to life warning level</p>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 group-hover:scale-110 transition">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Flood Warnings Card */}
      <div
        onClick={() => onSelectSeverity('2')}
        className="cursor-pointer bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 p-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Active Warnings</p>
            <p className="text-2xl font-black text-amber-100 mt-1">{warningCount + alertCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">{warningCount} Warnings, {alertCount} Alerts</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 group-hover:scale-110 transition">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Hydrometric Monitoring Stations */}
      <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Hydrometric Stations</p>
            <p className="text-2xl font-black text-cyan-100 mt-1">{stations.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Live sensors across England</p>
          </div>
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Droplets className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Connected Police Forces */}
      <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">UK Police Forces</p>
            <p className="text-2xl font-black text-emerald-100 mt-1">{policeForces.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Street crime &amp; safety endpoints</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
