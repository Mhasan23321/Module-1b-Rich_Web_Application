import { FloodWarning, HydrometricStation, TelemetryReading } from '../types/flood';
import { PoliceForce, PoliceForceDetails, SeniorOfficer, CrimeStreetIncident } from '../types/police';

export const MOCK_FLOOD_WARNINGS: FloodWarning[] = [
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floods/154321',
    description: 'River Thames at Windsor and Etches Park area. Water levels are elevated due to recent heavy rainfall.',
    eaAreaName: 'Thames',
    eaRegionName: 'South East',
    floodAreaTitle: 'River Thames at Windsor and Eton',
    floodArea: {
      '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/061FWF34Windsor',
      notation: '061FWF34Windsor',
      county: 'Berkshire',
      riverOrSea: 'River Thames',
    },
    message: 'Property flooding is expected. River levels remain high on the River Thames as a result of sustained rain.',
    severity: 'Flood Warning',
    severityLevel: 2,
    timeRaised: '2025-01-14T08:30:00Z',
    timeMessageChanged: '2025-01-14T12:00:00Z',
    timeSeverityChanged: '2025-01-14T08:30:00Z',
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floods/154322',
    description: 'River Severn at Gloucester and Hempsted. Severe risk to life due to overflowing flood embankments.',
    eaAreaName: 'West Midlands',
    eaRegionName: 'Midlands',
    floodAreaTitle: 'River Severn at Gloucester Quay',
    floodArea: {
      '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/032FWFSEVERN1',
      notation: '032FWFSEVERN1',
      county: 'Gloucestershire',
      riverOrSea: 'River Severn',
    },
    message: 'Severe Flood Warning in effect. Emergency services are deployed. Evacuation advised for low-lying areas.',
    severity: 'Severe Flood Warning',
    severityLevel: 1,
    timeRaised: '2025-01-14T06:15:00Z',
    timeMessageChanged: '2025-01-14T11:45:00Z',
    timeSeverityChanged: '2025-01-14T06:15:00Z',
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floods/154323',
    description: 'River Ouse at York city centre. River levels rising rapidly near Viking Recorder.',
    eaAreaName: 'Yorkshire',
    eaRegionName: 'North East',
    floodAreaTitle: 'River Ouse at York St Georges Field',
    floodArea: {
      '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122FWF123York',
      notation: '122FWF123York',
      county: 'North Yorkshire',
      riverOrSea: 'River Ouse',
    },
    message: 'Flood Alert: Flooding is possible for River Ouse. Low-lying footpath and Riverside car parks flooded.',
    severity: 'Flood Alert',
    severityLevel: 3,
    timeRaised: '2025-01-14T09:00:00Z',
    timeMessageChanged: '2025-01-14T10:30:00Z',
    timeSeverityChanged: '2025-01-14T09:00:00Z',
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floods/154324',
    description: 'River Mersey at Warrington Victoria Park.',
    eaAreaName: 'Greater Manchester',
    eaRegionName: 'North West',
    floodAreaTitle: 'River Mersey near Warrington',
    floodArea: {
      '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/011FWFMERSEY',
      notation: '011FWFMERSEY',
      county: 'Cheshire',
      riverOrSea: 'River Mersey',
    },
    message: 'Flood Alert: River levels high. No further property flooding expected.',
    severity: 'Flood Alert',
    severityLevel: 3,
    timeRaised: '2025-01-14T07:45:00Z',
    timeMessageChanged: '2025-01-14T09:15:00Z',
    timeSeverityChanged: '2025-01-14T07:45:00Z',
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floods/154325',
    description: 'River Avon at Bath and Saltford.',
    eaAreaName: 'Wessex',
    eaRegionName: 'South West',
    floodAreaTitle: 'River Avon at Bathford',
    floodArea: {
      '@id': 'http://environment.data.gov.uk/flood-monitoring/id/floodAreas/084FWFAVON',
      notation: '084FWFAVON',
      county: 'Somerset',
      riverOrSea: 'River Avon',
    },
    message: 'Warning Removed: River levels have fallen below flood threshold.',
    severity: 'Warning Removed',
    severityLevel: 4,
    timeRaised: '2025-01-13T14:00:00Z',
    timeMessageChanged: '2025-01-14T08:00:00Z',
    timeSeverityChanged: '2025-01-14T08:00:00Z',
  },
];

export const MOCK_STATIONS: HydrometricStation[] = [
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/stations/1029TH',
    stationReference: '1029TH',
    label: 'Thames at Kingston Lock',
    riverName: 'River Thames',
    catchmentName: 'Thames non-tidal',
    town: 'Kingston upon Thames',
    eaAreaName: 'Thames',
    lat: 51.411,
    long: -0.306,
    status: 'Active',
    stageScale: { typicalRangeLow: 0.15, typicalRangeHigh: 0.45 },
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/stations/2041SV',
    stationReference: '2041SV',
    label: 'Severn at Diglis Lock',
    riverName: 'River Severn',
    catchmentName: 'Severn Catchment',
    town: 'Worcester',
    eaAreaName: 'West Midlands',
    lat: 52.181,
    long: -2.223,
    status: 'Active',
    stageScale: { typicalRangeLow: 0.6, typicalRangeHigh: 2.8 },
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/stations/3092OU',
    stationReference: '3092OU',
    label: 'Ouse at Viking Recorder',
    riverName: 'River Ouse',
    catchmentName: 'Yorkshire Ouse',
    town: 'York',
    eaAreaName: 'Yorkshire',
    lat: 53.957,
    long: -1.082,
    status: 'Active',
    stageScale: { typicalRangeLow: 0.05, typicalRangeHigh: 1.9 },
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/stations/4015AV',
    stationReference: '4015AV',
    label: 'Avon at Bath Bridge',
    riverName: 'River Avon',
    catchmentName: 'Bristol Avon',
    town: 'Bath',
    eaAreaName: 'Wessex',
    lat: 51.378,
    long: -2.359,
    status: 'Active',
    stageScale: { typicalRangeLow: 0.2, typicalRangeHigh: 1.1 },
  },
  {
    '@id': 'http://environment.data.gov.uk/flood-monitoring/id/stations/5088MS',
    stationReference: '5088MS',
    label: 'Mersey at Westy',
    riverName: 'River Mersey',
    catchmentName: 'Mersey Estuary',
    town: 'Warrington',
    eaAreaName: 'Greater Manchester',
    lat: 53.385,
    long: -2.571,
    status: 'Active',
    stageScale: { typicalRangeLow: 0.3, typicalRangeHigh: 1.8 },
  },
];

export const generateMockReadings = (stationId: string): TelemetryReading[] => {
  const readings: TelemetryReading[] = [];
  const now = new Date();
  let baseValue = 1.45;
  if (stationId.includes('2041') || stationId.includes('Severn')) baseValue = 3.12;
  if (stationId.includes('3092') || stationId.includes('Ouse')) baseValue = 2.40;

  for (let i = 24; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 3600 * 1000);
    const variation = Math.sin(i / 3) * 0.35 + (Math.random() * 0.08 - 0.04);
    const val = Number((baseValue + variation).toFixed(2));
    readings.push({
      '@id': `http://environment.data.gov.uk/flood-monitoring/id/readings/${stationId}-${i}`,
      dateTime: d.toISOString(),
      measure: `http://environment.data.gov.uk/flood-monitoring/id/measures/${stationId}-level`,
      value: val < 0.1 ? 0.15 : val,
    });
  }
  return readings;
};

export const MOCK_POLICE_FORCES: PoliceForce[] = [
  { id: 'metropolitan', name: 'Metropolitan Police Service' },
  { id: 'city-of-london', name: 'City of London Police' },
  { id: 'thames-valley', name: 'Thames Valley Police' },
  { id: 'west-mercia', name: 'West Mercia Police' },
  { id: 'north-yorkshire', name: 'North Yorkshire Police' },
  { id: 'avon-and-somerset', name: 'Avon and Somerset Constabulary' },
  { id: 'cheshire', name: 'Cheshire Constabulary' },
  { id: 'greater-manchester', name: 'Greater Manchester Police' },
];

export const MOCK_FORCE_DETAILS: Record<string, PoliceForceDetails> = {
  metropolitan: {
    id: 'metropolitan',
    name: 'Metropolitan Police Service',
    telephone: '101 (Non-emergency) / 999 (Emergency)',
    url: 'https://www.met.police.uk/',
    description: 'The Metropolitan Police Service is responsible for law enforcement across Greater London, serving a population of over 8 million people.',
    engagement_methods: [
      { url: 'https://twitter.com/metpoliceuk', type: 'Twitter', description: 'Official X/Twitter feed', title: '@metpoliceuk' },
      { url: 'https://www.facebook.com/metpoliceuk', type: 'Facebook', description: 'Official Facebook Page', title: 'Met Police' },
    ],
  },
  'thames-valley': {
    id: 'thames-valley',
    name: 'Thames Valley Police',
    telephone: '101',
    url: 'https://www.thamesvalley.police.uk/',
    description: 'Thames Valley Police is the territorial police force responsible for Berkshire, Buckinghamshire and Oxfordshire.',
    engagement_methods: [
      { url: 'https://twitter.com/tvp_police', type: 'Twitter', description: 'Official X account', title: '@tvp_police' },
    ],
  },
};

export const MOCK_SENIOR_OFFICERS: SeniorOfficer[] = [
  { rank: 'Commissioner', name: 'Sir Mark Rowley KPM', bio: 'Appointed Commissioner of Police of the Metropolis in September 2022.' },
  { rank: 'Deputy Commissioner', name: 'Dame Lynne Owens DCB CBE QPM', bio: 'Former Director General of the National Crime Agency.' },
  { rank: 'Assistant Commissioner', name: 'Matt Jukes QPM', bio: 'Head of Specialist Operations and Counter Terrorism Policing.' },
];

export const MOCK_CRIMES: CrimeStreetIncident[] = [
  {
    id: 10849201,
    persistent_id: 'abc123def456',
    month: '2024-11',
    category: 'anti-social-behaviour',
    location_type: 'Force',
    context: '',
    location_subtype: '',
    location: { latitude: '51.411', longitude: '-0.306', street: { id: 98123, name: 'On or near High Street' } },
    outcome_status: null,
  },
  {
    id: 10849202,
    persistent_id: 'abc123def457',
    month: '2024-11',
    category: 'vehicle-crime',
    location_type: 'Force',
    context: '',
    location_subtype: '',
    location: { latitude: '51.412', longitude: '-0.307', street: { id: 98124, name: 'On or near Riverside Walk' } },
    outcome_status: { category: 'Under investigation', date: '2024-11' },
  },
  {
    id: 10849203,
    persistent_id: 'abc123def458',
    month: '2024-11',
    category: 'burglary',
    location_type: 'Force',
    context: '',
    location_subtype: '',
    location: { latitude: '51.410', longitude: '-0.305', street: { id: 98125, name: 'On or near Lock Road' } },
    outcome_status: { category: 'Investigation complete; no suspect identified', date: '2024-11' },
  },
  {
    id: 10849204,
    persistent_id: 'abc123def459',
    month: '2024-11',
    category: 'violent-crime',
    location_type: 'Force',
    context: '',
    location_subtype: '',
    location: { latitude: '51.413', longitude: '-0.308', street: { id: 98126, name: 'On or near Market Place' } },
    outcome_status: { category: 'Awaiting court outcome', date: '2024-11' },
  },
  {
    id: 10849205,
    persistent_id: 'abc123def460',
    month: '2024-11',
    category: 'public-order',
    location_type: 'Force',
    context: '',
    location_subtype: '',
    location: { latitude: '51.409', longitude: '-0.304', street: { id: 98127, name: 'On or near Station Approach' } },
    outcome_status: null,
  },
];
