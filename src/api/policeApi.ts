import { PoliceForce, PoliceForceDetails, SeniorOfficer, CrimeStreetIncident, StopAndSearchIncident } from '../types/police';
import { ApiCallLog } from '../types/common';
import { MOCK_POLICE_FORCES, MOCK_FORCE_DETAILS, MOCK_SENIOR_OFFICERS, MOCK_CRIMES } from './mockData';

const BASE_POLICE_URL = 'https://data.police.uk/api';

export const fetchPoliceForces = async (
  onLog?: (log: ApiCallLog) => void
): Promise<{ forces: PoliceForce[]; isFallback: boolean }> => {
  const url = `${BASE_POLICE_URL}/forces`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`Police API returned HTTP ${res.status}`);

    const data: PoliceForce[] = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'Police UK',
        isFallback: false,
      });
    }

    return { forces: data && data.length > 0 ? data : MOCK_POLICE_FORCES, isFallback: false };
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
        source: 'Police UK',
        isFallback: true,
      });
    }
    console.warn('Police API forces fallback activated:', err);
    return { forces: MOCK_POLICE_FORCES, isFallback: true };
  }
};

export const fetchForceDetails = async (
  forceId: string,
  onLog?: (log: ApiCallLog) => void
): Promise<{ details: PoliceForceDetails | null; isFallback: boolean }> => {
  const url = `${BASE_POLICE_URL}/forces/${forceId}`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`Police Force Details HTTP ${res.status}`);

    const data: PoliceForceDetails = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'Police UK',
        isFallback: false,
      });
    }

    return { details: data, isFallback: false };
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
        source: 'Police UK',
        isFallback: true,
      });
    }
    console.warn(`Police Force Details fallback for ${forceId}:`, err);
    return { details: MOCK_FORCE_DETAILS[forceId] || MOCK_FORCE_DETAILS['metropolitan'], isFallback: true };
  }
};

export const fetchSeniorOfficers = async (
  forceId: string,
  onLog?: (log: ApiCallLog) => void
): Promise<{ officers: SeniorOfficer[]; isFallback: boolean }> => {
  const url = `${BASE_POLICE_URL}/forces/${forceId}/people`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`Police Officers HTTP ${res.status}`);

    const data: SeniorOfficer[] = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'Police UK',
        isFallback: false,
      });
    }

    return { officers: data && data.length > 0 ? data : MOCK_SENIOR_OFFICERS, isFallback: false };
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
        source: 'Police UK',
        isFallback: true,
      });
    }
    console.warn(`Police Officers fallback for ${forceId}:`, err);
    return { officers: MOCK_SENIOR_OFFICERS, isFallback: true };
  }
};

export const fetchCrimesByLocation = async (
  lat: number,
  lng: number,
  date?: string,
  onLog?: (log: ApiCallLog) => void
): Promise<{ crimes: CrimeStreetIncident[]; isFallback: boolean }> => {
  const dateParam = date ? `&date=${date}` : '';
  const url = `${BASE_POLICE_URL}/crimes-street/all-crime?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}${dateParam}`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`Police Crimes HTTP ${res.status}`);

    const data: CrimeStreetIncident[] = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'Police UK',
        isFallback: false,
      });
    }

    return { crimes: data && data.length > 0 ? data : MOCK_CRIMES, isFallback: false };
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
        source: 'Police UK',
        isFallback: true,
      });
    }
    console.warn(`Police Crimes fallback for lat:${lat}, lng:${lng}:`, err);
    return { crimes: MOCK_CRIMES, isFallback: true };
  }
};

export const fetchStopAndSearchByLocation = async (
  lat: number,
  lng: number,
  date?: string,
  onLog?: (log: ApiCallLog) => void
): Promise<{ stops: StopAndSearchIncident[]; isFallback: boolean }> => {
  const dateParam = date ? `&date=${date}` : '';
  const url = `${BASE_POLICE_URL}/stops-street?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}${dateParam}`;
  const startTime = performance.now();
  const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const durationMs = Math.round(performance.now() - startTime);

    if (!res.ok) throw new Error(`Police Stops HTTP ${res.status}`);

    const data: StopAndSearchIncident[] = await res.json();

    if (onLog) {
      onLog({
        id,
        timestamp: new Date().toLocaleTimeString(),
        url,
        method: 'GET',
        status: res.status,
        durationMs,
        source: 'Police UK',
        isFallback: false,
      });
    }

    return { stops: data, isFallback: false };
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
        source: 'Police UK',
        isFallback: true,
      });
    }
    console.warn(`Police Stops fallback for lat:${lat}, lng:${lng}:`, err);
    return { stops: [], isFallback: true };
  }
};
