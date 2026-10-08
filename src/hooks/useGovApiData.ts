import { useState, useEffect, useCallback, useMemo } from 'react';
import { FloodWarning, HydrometricStation, TelemetryReading } from '../types/flood';
import { PoliceForce, CrimeStreetIncident, PoliceForceDetails, SeniorOfficer } from '../types/police';
import { FilterOptions, ApiCallLog } from '../types/common';
import { fetchFloodWarnings, fetchHydrometricStations, fetchStationReadings } from '../api/defraApi';
import { fetchPoliceForces, fetchForceDetails, fetchSeniorOfficers, fetchCrimesByLocation } from '../api/policeApi';

export function useGovApiData() {
  const [warnings, setWarnings] = useState<FloodWarning[]>([]);
  const [stations, setStations] = useState<HydrometricStation[]>([]);
  const [policeForces, setPoliceForces] = useState<PoliceForce[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiLogs, setApiLogs] = useState<ApiCallLog[]>([]);

  // Selected Station for Interrogation
  const [selectedStation, setSelectedStation] = useState<HydrometricStation | null>(null);
  const [stationReadings, setStationReadings] = useState<TelemetryReading[]>([]);
  const [stationCrimes, setStationCrimes] = useState<CrimeStreetIncident[]>([]);
  const [interrogatingLoading, setInterrogatingLoading] = useState<boolean>(false);

  // Selected Police Force for Interrogation
  const [selectedForceId, setSelectedForceId] = useState<string>('metropolitan');
  const [selectedForceDetails, setSelectedForceDetails] = useState<PoliceForceDetails | null>(null);
  const [selectedForceOfficers, setSelectedForceOfficers] = useState<SeniorOfficer[]>([]);
  const [forceLoading, setForceLoading] = useState<boolean>(false);

  // Filter State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    severityLevel: 'all',
    eaRegion: 'all',
    measureType: 'all',
    policeForce: 'all',
    crimeMonth: '2024-11',
  });

  const addLog = useCallback((log: ApiCallLog) => {
    setApiLogs((prev) => [log, ...prev.slice(0, 49)]);
  }, []);

  // Initial Load (Initial API Calls)
  const refreshInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [warningsRes, stationsRes, forcesRes] = await Promise.all([
        fetchFloodWarnings(addLog),
        fetchHydrometricStations(addLog),
        fetchPoliceForces(addLog),
      ]);

      setWarnings(warningsRes.warnings);
      setStations(stationsRes.stations);
      setPoliceForces(forcesRes.forces);

      if (stationsRes.stations.length > 0 && !selectedStation) {
        setSelectedStation(stationsRes.stations[0]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch UK Government API data');
    } finally {
      setLoading(false);
    }
  }, [addLog, selectedStation]);

  useEffect(() => {
    refreshInitialData();
  }, [refreshInitialData]);

  // Interrogate Station Further (Subsequent API Calls)
  const handleSelectStation = useCallback(async (station: HydrometricStation) => {
    setSelectedStation(station);
    setInterrogatingLoading(true);

    try {
      const [readingsRes, crimesRes] = await Promise.all([
        fetchStationReadings(station['@id'], addLog),
        fetchCrimesByLocation(station.lat, station.long, filters.crimeMonth, addLog),
      ]);

      setStationReadings(readingsRes.readings);
      setStationCrimes(crimesRes.crimes);
    } catch (err) {
      console.error('Error interrogating station:', err);
    } finally {
      setInterrogatingLoading(false);
    }
  }, [addLog, filters.crimeMonth]);

  // Load readings for initial station when selected
  useEffect(() => {
    if (selectedStation && stationReadings.length === 0 && !interrogatingLoading) {
      handleSelectStation(selectedStation);
    }
  }, [selectedStation, stationReadings.length, interrogatingLoading, handleSelectStation]);

  // Interrogate Police Force (Subsequent API Calls)
  const handleSelectPoliceForce = useCallback(async (forceId: string) => {
    setSelectedForceId(forceId);
    setForceLoading(true);

    try {
      const [detailsRes, officersRes] = await Promise.all([
        fetchForceDetails(forceId, addLog),
        fetchSeniorOfficers(forceId, addLog),
      ]);

      setSelectedForceDetails(detailsRes.details);
      setSelectedForceOfficers(officersRes.officers);
    } catch (err) {
      console.error('Error fetching police force details:', err);
    } finally {
      setForceLoading(false);
    }
  }, [addLog]);

  useEffect(() => {
    if (selectedForceId && !selectedForceDetails && !forceLoading) {
      handleSelectPoliceForce(selectedForceId);
    }
  }, [selectedForceId, selectedForceDetails, forceLoading, handleSelectPoliceForce]);

  // Filtered Warnings
  const filteredWarnings = useMemo(() => {
    return warnings.filter((w) => {
      const matchesSearch =
        filters.searchQuery === '' ||
        w.floodAreaTitle.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        w.eaAreaName.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesSeverity =
        filters.severityLevel === 'all' || w.severityLevel.toString() === filters.severityLevel;

      const matchesRegion =
        filters.eaRegion === 'all' || w.eaRegionName.toLowerCase().includes(filters.eaRegion.toLowerCase());

      return matchesSearch && matchesSeverity && matchesRegion;
    });
  }, [warnings, filters]);

  // Filtered Stations
  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      const matchesSearch =
        filters.searchQuery === '' ||
        s.label.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        (s.riverName && s.riverName.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (s.town && s.town.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [stations, filters.searchQuery]);

  // Derived EA Regions list
  const eaRegions = useMemo(() => {
    const regions = new Set<string>();
    warnings.forEach((w) => {
      if (w.eaRegionName) regions.add(w.eaRegionName);
    });
    return Array.from(regions).sort();
  }, [warnings]);

  return {
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
  };
}
