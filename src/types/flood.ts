export interface FloodArea {
  '@id': string;
  county?: string;
  notation: string;
  polygon?: string;
  riverOrSea?: string;
}

export interface FloodWarning {
  '@id': string;
  description: string;
  eaAreaName: string;
  eaRegionName: string;
  floodArea: FloodArea;
  floodAreaTitle: string;
  isCentroid?: boolean;
  message: string;
  severity: string; // e.g. "Severe Flood Warning", "Flood Warning", "Flood Alert", "Warning Removed"
  severityLevel: number; // 1 = Severe, 2 = Warning, 3 = Alert, 4 = Removed
  timeMessageChanged: string;
  timeRaised: string;
  timeSeverityChanged: string;
}

export interface HydrometricMeasure {
  '@id': string;
  label: string;
  parameterName: string;
  parameter: string;
  period: number;
  qualifier: string;
  unitName: string;
  valueType?: string;
}

export interface HydrometricStation {
  '@id': string;
  stationReference: string;
  label: string;
  riverName?: string;
  catchmentName?: string;
  town?: string;
  eaAreaName?: string;
  lat: number;
  long: number;
  measures?: HydrometricMeasure | HydrometricMeasure[];
  status?: string;
  stageScale?: {
    typicalRangeHigh?: number;
    typicalRangeLow?: number;
  };
}

export interface TelemetryReading {
  '@id': string;
  dateTime: string;
  measure: string;
  value: number;
}

export interface FloodApiResponse<T> {
  '@context': string;
  meta: {
    publisher: string;
    licence: string;
    documentation: string;
    version: string;
    comment: string;
    hasFormat: string[];
  };
  items: T[];
}
