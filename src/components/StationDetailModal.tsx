import React from 'react';
import { HydrometricStation, TelemetryReading } from '../types/flood';
import { CrimeStreetIncident } from '../types/police';
import { TelemetryChart } from './TelemetryChart';
import { CrimeBreakdownChart } from './CrimeBreakdownChart';
import { X, Droplets, MapPin, Compass, ShieldAlert, Cpu } from 'lucide-react';

interface StationDetailModalProps {
  station: HydrometricStation | null;
  readings: TelemetryReading[];
  crimes: CrimeStreetIncident[];
  loading: boolean;
  onClose: () => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  station,
  readings,
  crimes,
  loading,
  onClose,
}) => {
  if (!station) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{station.label}</h3>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-2 py-0.5 rounded-full">
                ID: {station.stationReference}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> River: {station.riverName || 'N/A'}
              </span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" /> Town: {station.town || 'N/A'}
              </span>
              <span>EA Region: {station.eaAreaName || 'England'}</span>
            </p>
          </div>
        </div>

        {/* Station Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block">Latitude</span>
            <span className="text-slate-200 font-bold">{station.lat.toFixed(4)}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block">Longitude</span>
            <span className="text-slate-200 font-bold">{station.long.toFixed(4)}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block">Typical Low</span>
            <span className="text-emerald-400 font-bold">
              {station.stageScale?.typicalRangeLow || 0.15} m
            </span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block">Typical High</span>
            <span className="text-rose-400 font-bold">
              {station.stageScale?.typicalRangeHigh || 1.8} m
            </span>
          </div>
        </div>

        {/* Deep Interrogation Section 1: Telemetry Chart */}
        <div className="mb-6">
          <TelemetryChart station={station} readings={readings} loading={loading} />
        </div>

        {/* Deep Interrogation Section 2: Localized Crime Analysis */}
        <div className="mb-4">
          <CrimeBreakdownChart crimes={crimes} loading={loading} lat={station.lat} lng={station.long} />
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Interrogated via Live HTTP API Calls
          </span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            Close Interrogation View
          </button>
        </div>
      </div>
    </div>
  );
};
