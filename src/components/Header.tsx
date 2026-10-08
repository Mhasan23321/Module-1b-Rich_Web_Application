import React from 'react';
import { ShieldCheck, Activity, Terminal, RefreshCw, Moon, Sun, Download } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onRefresh: () => void;
  loading: boolean;
  onOpenApiConsole: () => void;
  onOpenExport: () => void;
  apiLogsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onRefresh,
  loading,
  onOpenApiConsole,
  onOpenExport,
  apiLogsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg transition-colors">
      {/* Top Security Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-xs py-1 px-4 text-center font-mono tracking-wider text-emerald-200 border-b border-emerald-700/40 flex justify-between items-center">
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          OFFICIAL // UNCLASSIFIED UK PUBLIC DATA PORTAL
        </span>
        <span className="hidden sm:inline text-emerald-300/80">
          Open Data Sourced via DEFRA &amp; UK Home Office APIs
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          LIVE CONNECTED
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                UK <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Gov Intel</span> Portal
              </h1>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Module 1B
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-Time UK Environmental Hydrometry &amp; Public Safety Explorer
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition shadow-sm disabled:opacity-50"
            title="Refresh API Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{loading ? 'Fetching...' : 'Refresh API'}</span>
          </button>

          {/* Export Data Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition shadow-sm"
            title="Export API Data"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* API Inspector Button */}
          <button
            onClick={onOpenApiConsole}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-2 rounded-lg border border-cyan-500/30 transition shadow-sm relative"
            title="View Live API HTTP Console"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>API Console</span>
            {apiLogsCount > 0 && (
              <span className="bg-cyan-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {apiLogsCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
