import React from 'react';
import { FloodWarning, HydrometricStation } from '../types/flood';
import { PoliceForce } from '../types/police';
import { Download, X, FileSpreadsheet, FileCode } from 'lucide-react';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  warnings: FloodWarning[];
  stations: HydrometricStation[];
  policeForces: PoliceForce[];
}

export const DataExportModal: React.FC<DataExportModalProps> = ({
  isOpen,
  onClose,
  warnings,
  stations,
  policeForces,
}) => {
  if (!isOpen) return null;

  const exportToJson = (data: any, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportWarningsCsv = () => {
    const headers = ['Area Title', 'Severity', 'Severity Level', 'EA Region', 'River/Sea', 'Message'];
    const rows = warnings.map((w) => [
      `"${w.floodAreaTitle.replace(/"/g, '""')}"`,
      `"${w.severity}"`,
      w.severityLevel,
      `"${w.eaRegionName || ''}"`,
      `"${w.floodArea?.riverOrSea || ''}"`,
      `"${w.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uk_flood_warnings_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Export API Intelligence Data</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Download live UK DEFRA &amp; Police dataset extractions in structured formats for offline reporting or GIS software.
        </p>

        <div className="space-y-3">
          {/* Export CSV */}
          <button
            onClick={exportWarningsCsv}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 group-hover:scale-105 transition">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Export Flood Warnings (CSV)</p>
                <p className="text-[11px] text-slate-400">Spreadsheet format ({warnings.length} items)</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
          </button>

          {/* Export JSON */}
          <button
            onClick={() => exportToJson({ floodWarnings: warnings, hydrometricStations: stations, policeForces }, `uk_gov_intel_${Date.now()}.json`)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 group-hover:scale-105 transition">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Export Full Dataset Bundle (JSON)</p>
                <p className="text-[11px] text-slate-400">Complete raw JSON payload</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </button>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
