import React from 'react';
import { PoliceForce, PoliceForceDetails, SeniorOfficer } from '../types/police';
import { Shield, Phone, Globe, UserCheck, ExternalLink, Building2 } from 'lucide-react';

interface PoliceForceExplorerProps {
  forces: PoliceForce[];
  selectedForceId: string;
  onSelectForce: (forceId: string) => void;
  details: PoliceForceDetails | null;
  officers: SeniorOfficer[];
  loading: boolean;
}

export const PoliceForceExplorer: React.FC<PoliceForceExplorerProps> = ({
  forces,
  selectedForceId,
  onSelectForce,
  details,
  officers,
  loading,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl mb-6">
      {/* Component Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white">UK Police Force &amp; Leadership Explorer</h3>
          <p className="text-xs text-slate-400">
            Interrogate Home Office Police Data API for Territorial Forces &amp; Senior Command Officers
          </p>
        </div>
      </div>

      {/* Force Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Force List */}
        <div className="md:col-span-1 bg-slate-950 border border-slate-800 rounded-xl p-3 max-h-[420px] overflow-y-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-2">
            Select UK Police Force ({forces.length})
          </p>
          <div className="space-y-1">
            {forces.map((f) => {
              const isSelected = f.id === selectedForceId;
              return (
                <button
                  key={f.id}
                  onClick={() => onSelectForce(f.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="truncate">{f.name}</span>
                  <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interrogated Force Profile & Leadership */}
        <div className="md:col-span-2 space-y-4">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-mono">Fetching Police Force Profile &amp; Leadership...</p>
            </div>
          ) : details ? (
            <>
              {/* Force Profile Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3 mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      {details.name}
                    </h4>
                    <p className="text-xs text-slate-400">ID: <span className="font-mono text-emerald-400">{details.id}</span></p>
                  </div>
                  {details.url && (
                    <a
                      href={details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition"
                    >
                      <Globe className="w-3.5 h-3.5" /> Official Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {details.description || 'Territorial police force providing public safety and law enforcement across the region.'}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Non-Emergency: {details.telephone || '101'}</span>
                  </div>
                </div>
              </div>

              {/* Senior Officers Roster */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Senior Command Officers &amp; Executive Leadership ({officers.length})
                </h5>

                {officers.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No senior officer profiles published for this force.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {officers.map((off, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                        <p className="text-xs font-bold text-white">{off.name}</p>
                        <p className="text-[11px] text-emerald-400 font-mono font-semibold">{off.rank}</p>
                        {off.bio && (
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{off.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl">
              Select a police force from the list to view live details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
