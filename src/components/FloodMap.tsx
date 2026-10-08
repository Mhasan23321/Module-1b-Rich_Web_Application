import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FloodWarning, HydrometricStation } from '../types/flood';
import { Flame, AlertTriangle, Droplets, MapPin } from 'lucide-react';

interface FloodMapProps {
  warnings: FloodWarning[];
  stations: HydrometricStation[];
  selectedStation: HydrometricStation | null;
  onSelectStation: (station: HydrometricStation) => void;
}

// Custom Div Icon Builder for Leaflet Map Pins
const createCustomIcon = (type: 'severe' | 'warning' | 'alert' | 'station', label?: string) => {
  let colorClass = 'bg-cyan-500 border-cyan-300 text-cyan-950';
  let pulseClass = 'bg-cyan-400';

  if (type === 'severe') {
    colorClass = 'bg-rose-600 border-rose-300 text-white animate-pulse';
    pulseClass = 'bg-rose-500';
  } else if (type === 'warning') {
    colorClass = 'bg-amber-500 border-amber-200 text-slate-950';
    pulseClass = 'bg-amber-400';
  } else if (type === 'alert') {
    colorClass = 'bg-amber-400/90 border-amber-100 text-slate-950';
    pulseClass = 'bg-amber-300';
  }

  const html = `
    <div class="relative flex items-center justify-center">
      <span class="absolute inline-flex h-8 w-8 rounded-full ${pulseClass} opacity-40 animate-ping"></span>
      <div class="relative w-7 h-7 rounded-full ${colorClass} border-2 shadow-lg flex items-center justify-center font-bold text-[11px] font-mono">
        ${label || (type === 'station' ? '💧' : '⚠️')}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export const FloodMap: React.FC<FloodMapProps> = ({
  warnings,
  stations,
  selectedStation,
  onSelectStation,
}) => {
  // Default UK Center (London / Thames / Central UK)
  const defaultCenter: [number, number] = [52.355, -1.174];
  const zoomLevel = 7;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mb-6">
      {/* Map Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-200">UK Environmental Telemetry &amp; Risk Map</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span> Severe Warning
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Warning/Alert
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Station
          </span>
        </div>
      </div>

      {/* Leaflet Map Box */}
      <div className="h-[520px] w-full relative z-0">
        <MapContainer
          center={defaultCenter}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', background: '#090d16' }}
        >
          {/* Dark Tile Layer for High-Tech Aesthetic */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Hydrometric Stations Pins */}
          {stations.map((st) => (
            <Marker
              key={st['@id']}
              position={[st.lat, st.long]}
              icon={createCustomIcon('station', '💧')}
              eventHandlers={{
                click: () => onSelectStation(st),
              }}
            >
              <Popup className="dark-leaflet-popup">
                <div className="p-2 text-slate-900 min-w-[200px]">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <DropletIcon /> {st.label}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    River: <span className="font-semibold text-slate-800">{st.riverName || 'N/A'}</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Town: <span className="font-semibold text-slate-800">{st.town || 'N/A'}</span>
                  </p>
                  <button
                    onClick={() => onSelectStation(st)}
                    className="mt-2.5 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs py-1.5 px-3 rounded shadow transition"
                  >
                    Interrogate Telemetry &amp; Crime
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

const DropletIcon = () => (
  <span className="inline-block w-3 h-3 rounded-full bg-cyan-500"></span>
);
