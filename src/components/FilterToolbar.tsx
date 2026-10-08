import React from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { FilterOptions } from '../types/common';

interface FilterToolbarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  eaRegions: string[];
  totalResults: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  setFilters,
  eaRegions,
  totalResults,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, severityLevel: e.target.value }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, eaRegion: e.target.value }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, crimeMonth: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      severityLevel: 'all',
      eaRegion: 'all',
      measureType: 'all',
      policeForce: 'all',
      crimeMonth: '2024-11',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' || filters.severityLevel !== 'all' || filters.eaRegion !== 'all';

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          placeholder="Filter by river name, town, county or region (e.g., Thames, York, Windsor)..."
          className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 text-slate-100 text-xs rounded-lg pl-9 pr-4 py-2.5 outline-none transition"
        />
        {filters.searchQuery && (
          <button
            onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        {/* Severity Select */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={filters.severityLevel}
            onChange={handleSeverityChange}
            className="bg-transparent text-slate-200 outline-none text-xs cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="1">Severe Flood Warning (Level 1)</option>
            <option value="2">Flood Warning (Level 2)</option>
            <option value="3">Flood Alert (Level 3)</option>
            <option value="4">Warning Removed (Level 4)</option>
          </select>
        </div>

        {/* Region Select */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <select
            value={filters.eaRegion}
            onChange={handleRegionChange}
            className="bg-transparent text-slate-200 outline-none text-xs cursor-pointer"
          >
            <option value="all">All EA Regions</option>
            {eaRegions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* Crime Month Select */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <select
            value={filters.crimeMonth}
            onChange={handleMonthChange}
            className="bg-transparent text-slate-200 outline-none text-xs cursor-pointer"
          >
            <option value="2024-11">Crime Month: Nov 2024</option>
            <option value="2024-10">Crime Month: Oct 2024</option>
            <option value="2024-09">Crime Month: Sep 2024</option>
            <option value="2024-08">Crime Month: Aug 2024</option>
          </select>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-2 rounded-lg transition"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
