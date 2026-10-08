import React, { useState } from 'react';
import { useGovApiData } from './hooks/useGovApiData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StatSummaryCards } from './components/StatSummaryCards';
import { FilterToolbar } from './components/FilterToolbar';
import { FloodMap } from './components/FloodMap';
import { StationDetailModal } from './components/StationDetailModal';
import { PoliceForceExplorer } from './components/PoliceForceExplorer';
import { ApiDocsView } from './components/ApiDocsView';
import { ApiConsoleModal } from './components/ApiConsoleModal';
import { DataExportModal } from './components/DataExportModal';
import { Footer } from './components/Footer';
import { ActiveTab } from './types/common';
import { AlertTriangle, Flame, Droplets, MapPin, Search, ChevronRight, Activity, Cpu } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const {
    warnings,
    stations,
    policeForces,
    filteredWarnings,
    filteredStations,
    eaRegions,
    loading,
    error,
    apiLogs,
    filters,
    setFilters,
    selectedStation,
    stationReadings,
    stationCrimes,
    interrogatingLoading,
    handleSelectStation,
    selectedForceId,
    selectedForceDetails,
    selectedForceOfficers,
    forceLoading,
    handleSelectPoliceForce,
    refreshInitialData,
  } = useGovApiData();

  const handleStationClick = (st: any) => {
    handleSelectStation(st);
    setIsDetailModalOpen(true);
  };

  const handleSelectSeverityFromCard = (level: string) => {
    setFilters((prev) => ({ ...prev, severityLevel: level }));
    setActiveTab('dashboard');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors font-sans`}>
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onRefresh={refreshInitialData}
        loading={loading}
        onOpenApiConsole={() => setIsConsoleOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        apiLogsCount={apiLogs.length}
      />

      {/* Main App Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        floodCount={warnings.length}
        stationCount={stations.length}
        policeCount={policeForces.length}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-xl mb-6 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={refreshInitialData}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 px-3 py-1 rounded font-bold transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Overview Dashboard View */}
        {activeTab === 'dashboard' && (
          <div>
            <StatSummaryCards
              warnings={warnings}
              stations={stations}
              policeForces={policeForces}
              onSelectSeverity={handleSelectSeverityFromCard}
            />

            <FilterToolbar
              filters={filters}
              setFilters={setFilters}
              eaRegions={eaRegions}
              totalResults={filteredWarnings.length}
            />

            {/* Split Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Active Flood Warnings (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Active Flood Risk Warnings ({filteredWarnings.length})
                  </h3>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="bg-slate-900 border border-slate-800 p-4 rounded-xl animate-pulse h-24"></div>
                    ))}
                  </div>
                ) : filteredWarnings.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-400 text-xs">
                    No active flood warnings match the current filter query.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredWarnings.map((w) => {
                      const isSevere = w.severityLevel === 1;
                      const isWarning = w.severityLevel === 2;
                      return (
                        <div
                          key={w['@id']}
                          className={`bg-slate-900/90 border p-4 rounded-xl shadow-md transition-all hover:border-slate-700 ${
                            isSevere
                              ? 'border-rose-500/40 bg-rose-950/10'
                              : isWarning
                              ? 'border-amber-500/40 bg-amber-950/10'
                              : 'border-slate-800'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                isSevere
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : isWarning
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                              }`}
                            >
                              {isSevere ? <Flame className="w-3 h-3 text-rose-400" /> : <AlertTriangle className="w-3 h-3 text-amber-400" />}
                              {w.severity}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              Raised: {new Date(w.timeRaised).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-1">{w.floodAreaTitle}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3">{w.message}</p>

                          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-cyan-400" /> {w.eaAreaName} ({w.eaRegionName || 'England'})
                            </span>
                            {stations.length > 0 && (
                              <button
                                onClick={() => handleStationClick(stations[0])}
                                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5 transition"
                              >
                                Interrogate Nearest Station <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Hydrometric Stations Grid (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" /> Hydrometric Telemetry Stations ({filteredStations.length})
                  </h3>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 max-h-[640px] overflow-y-auto space-y-2">
                  {filteredStations.map((st) => (
                    <div
                      key={st['@id']}
                      onClick={() => handleStationClick(st)}
                      className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-lg cursor-pointer transition flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                          {st.label}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          River: <span className="text-slate-300">{st.riverName || 'N/A'}</span> | Town:{' '}
                          <span className="text-slate-300">{st.town || 'N/A'}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-1 rounded font-semibold">
                          Interrogate
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map View */}
        {activeTab === 'map' && (
          <FloodMap
            warnings={warnings}
            stations={stations}
            selectedStation={selectedStation}
            onSelectStation={handleStationClick}
          />
        )}

        {/* Stations List View */}
        {activeTab === 'stations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Hydrometric Telemetry Stations Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStations.map((st) => (
                <div
                  key={st['@id']}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white">{st.label}</h4>
                      <span className="text-[10px] font-mono bg-slate-950 text-cyan-400 border border-slate-800 px-2 py-0.5 rounded">
                        {st.stationReference}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">River: {st.riverName || 'N/A'}</p>
                    <p className="text-xs text-slate-400 mb-3">Town: {st.town || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => handleStationClick(st)}
                    className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs py-2 rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5" /> Interrogate Station Readings &amp; Crime
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Police Force Explorer View */}
        {activeTab === 'police' && (
          <PoliceForceExplorer
            forces={policeForces}
            selectedForceId={selectedForceId}
            onSelectForce={handleSelectPoliceForce}
            details={selectedForceDetails}
            officers={selectedForceOfficers}
            loading={forceLoading}
          />
        )}

        {/* API Docs & Mark Scheme View */}
        {activeTab === 'apidocs' && <ApiDocsView />}
      </main>

      {/* Modals */}
      <StationDetailModal
        station={selectedStation}
        readings={stationReadings}
        crimes={stationCrimes}
        loading={interrogatingLoading}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <ApiConsoleModal
        logs={apiLogs}
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />

      <DataExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        warnings={warnings}
        stations={stations}
        policeForces={policeForces}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
