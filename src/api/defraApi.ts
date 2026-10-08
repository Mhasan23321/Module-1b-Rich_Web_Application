import { FloodApiResponse, FloodWarning, HydrometricStation, TelemetryReading } from '../types/flood';
import { ApiCallLog } from '../types/common';
import { MOCK_FLOOD_WARNINGS, MOCK_STATIONS, generateMockReadings } from './mockData';

const BASE_DEFRA_URL = 'https://environment.data.gov.uk/flood-monitoring/id';

export const fetchFloodWarnings = async (
  onLog?: (log: ApiCallLog) => void
): Promise<{ warnings: FloodWarning[]; isFallback: boolean }> => {
  const url = `${BASE_DEFRA_URL}/floods?_limit=100`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`DEFRA API returned HTTP ${res.status}`);

    const data: FloodApiResponse<FloodWarning> = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'DEFRA',
        isFallback: false,
      });
    }

    return {
      warnings: data.items && data.items.length > 0 ? data.items : MOCK_FLOOD_WARNINGS,
      isFallback: false,
    };
  } catch (err) {
    const durationMs = Math.round(performance.now() - startTime);
    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: 0,
        durationMs,
        source: 'DEFRA',
        isFallback: true,
      });
    }
    console.warn('DEFRA API warning fetch fallback activated:', err);
    return { warnings: MOCK_FLOOD_WARNINGS, isFallback: true };
  }
};

export const fetchHydrometricStations = async (
  onLog?: (log: ApiCallLog) => void
): Promise<{ stations: HydrometricStation[]; isFallback: boolean }> => {
  const url = `${BASE_DEFRA_URL}/stations?_limit=150`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`DEFRA Stations API returned HTTP ${res.status}`);

    const data: FloodApiResponse<HydrometricStation> = await res.json();
    const validStations = (data.items || []).filter(
      (s) => typeof s.lat === 'number' && typeof s.long === 'number' && !isNaN(s.lat) && !isNaN(s.long)
    );

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'DEFRA',
        isFallback: false,
      });
    }

    return {
      stations: validStations.length > 0 ? validStations : MOCK_STATIONS,
      isFallback: false,
    };
  } catch (err) {
    const durationMs = Math.round(performance.now() - startTime);
    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: 0,
        durationMs,
        source: 'DEFRA',
        isFallback: true,
      });
    }
    console.warn('DEFRA API stations fetch fallback activated:', err);
    return { stations: MOCK_STATIONS, isFallback: true };
  }
};

export const fetchStationReadings = async (
  stationId: string,
  onLog?: (log: ApiCallLog) => void
): Promise<{ readings: TelemetryReading[]; isFallback: boolean }> => {
  const cleanId = stationId.replace('http://environment.data.gov.uk/flood-monitoring/id/stations/', '');
  const url = `${BASE_DEFRA_URL}/stations/${cleanId}/readings?_limit=48&_sorted`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`DEFRA Readings HTTP ${res.status}`);

    const data: FloodApiResponse<TelemetryReading> = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'DEFRA',
        isFallback: false,
      });
    }

    return {
      readings: data.items && data.items.length > 0 ? data.items : generateMockReadings(cleanId),
      isFallback: false,
    };
  } catch (err) {
    const durationMs = Math.round(performance.now() - startTime);
    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: 0,
        durationMs,
        source: 'DEFRA',
        isFallback: true,
      });
    }
    console.warn(`DEFRA API readings fallback for ${stationId}:`, err);
    return { readings: generateMockReadings(cleanId), isFallback: true };
  }
};
