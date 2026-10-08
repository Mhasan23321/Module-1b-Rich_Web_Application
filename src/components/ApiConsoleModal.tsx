import React from 'react';
import { ApiCallLog } from '../types/common';
import { Terminal, X, Copy, Check, Clock, Globe } from 'lucide-react';

interface ApiConsoleModalProps {
  logs: ApiCallLog[];
  isOpen: boolean;
  onClose: () => void;
}

export const ApiConsoleModal: React.FC<ApiConsoleModalProps> = ({
  logs,
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Live Government API HTTP Telemetry Log</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          This console tracks live HTTP requests made by the application to UK Government APIs (DEFRA Flood Monitoring &amp; Home Office Police UK).
        </p>

        {/* Logs List Container */}
        <div className="flex-1 overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-2">
          {logs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No API calls logged yet.</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        log.source === 'DEFRA'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {log.source}
                    </span>
                    <span className="text-emerald-400 font-bold">{log.method}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        log.status === 200
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : log.isFallback
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      HTTP {log.status === 0 ? 'FALLBACK' : log.status}
                    </span>
                    <span className="text-slate-500 text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.durationMs}ms
                    </span>
                  </div>
                  <p className="text-slate-300 truncate text-[11px] select-all">{log.url}</p>
                </div>

                <button
                  onClick={() => handleCopyUrl(log.id, log.url)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition shrink-0"
                >
                  {copiedId === log.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy URL
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 mt-4">
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Open API Endpoints (CORS Enabled)
          </span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
