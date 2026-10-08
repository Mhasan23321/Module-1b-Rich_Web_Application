export type ActiveTab = 'dashboard' | 'map' | 'stations' | 'police' | 'apidocs';

export interface FilterOptions {
  searchQuery: string;
  severityLevel: string; // 'all' | '1' | '2' | '3' | '4'
  eaRegion: string; // 'all' | region name
  measureType: string; // 'all' | 'level' | 'flow' | 'rainfall'
  policeForce: string; // 'all' | force id
  crimeMonth: string; // '2024-01' ...
}

export interface ApiCallLog {
  id: string;
  timestamp: string;
  url: string;
  method: string;
  status: number;
  durationMs: number;
  source: 'DEFRA' | 'Police UK';
  isFallback?: boolean;
}
