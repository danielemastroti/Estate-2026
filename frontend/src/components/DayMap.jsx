import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { resolveCoordinates, getDirectionsUrl } from '@/lib/geoUtils';
import { MapPin, Navigation, Maximize2, Minimize2, ChevronDown, ChevronUp, Compass } from 'lucide-react';

const PERIOD_COLORS = {
  morning: { bg: '#D97706', label: 'Mattina', badge: 'bg-amber-100 text-amber-900 border-amber-300' },
  afternoon: { bg: '#059669', label: 'Pomeriggio', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  evening: { bg: '#1E293B', label: 'Sera', badge: 'bg-slate-100 text-slate-900 border-slate-300' },
};

function createPinIcon(stepNumber, period, isSelected) {
  const periodInfo = PERIOD_COLORS[period] || PERIOD_COLORS.morning;
  const bgColor = periodInfo.bg;

  const pulseHtml = isSelected
    ? `<span class="absolute -top-1 -left-1 w-10 h-10 rounded-full animate-ping opacity-60" style="background-color: ${bgColor};"></span>`
    : '';

  return L.divIcon({
    className: 'custom-map-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        ${pulseHtml}
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          background: ${bgColor};
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          border: 2px solid #ffffff;
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          transition: transform 0.2s ease;
        ">
          ${stepNumber}
        </div>
      </div>
    `,
  });
}

export const DayMap = ({
  activities = [],
  dayName = '',
  selectedActivityId = null,
  onSelectActivity = null,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mappa le attività che hanno coordinate risolvibili
  const mappedActivities = useMemo(() => {
    return activities
      .map((activity) => {
        const coords = resolveCoordinates(activity);
        if (!coords) return null;
        return {
          ...activity,
          lat: coords.lat,
          lng: coords.lng,
          resolvedLabel: coords.label || activity.title,
        };
      })
      .filter(Boolean);
  }, [activities]);

  // Inizializza la mappa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([48.0768, 7.3585], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Pulisci marker precedenti
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (mappedActivities.length === 0) {
      return;
    }

    const latLngs = [];

    // Crea i nuovi marker
    mappedActivities.forEach((act) => {
      const isSelected = selectedActivityId === act.id;
      const icon = createPinIcon(act.stepNumber, act.period, isSelected);
      const marker = L.marker([act.lat, act.lng], { icon }).addTo(map);

      latLngs.push([act.lat, act.lng]);

      const directionsUrl = act.mappa || getDirectionsUrl(act.lat, act.lng, act.resolvedLabel);
      const periodLabel = PERIOD_COLORS[act.period]?.label || '';

      const popupContent = `
        <div style="font-family: 'Manrope', -apple-system, sans-serif; min-width: 200px; max-width: 260px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #64748b;">
              #${act.stepNumber} • ${act.time || ''}
            </span>
            <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #475569; letter-spacing: 0.05em;">
              ${periodLabel}
            </span>
          </div>
          <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; line-height: 1.2;">
            ${act.title}
          </h4>
          ${act.description ? `<p style="font-size: 12px; color: #475569; margin: 0 0 10px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${act.description}</p>` : ''}
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="
              display: inline-flex;
              align-items: center;
              gap: 4px;
              background-color: #0f172a;
              color: #ffffff;
              padding: 5px 10px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              text-decoration: none;
            ">
              🗺️ Naviga
            </a>
            ${onSelectActivity ? `
              <button id="btn-show-card-${act.id}" style="
                display: inline-flex;
                align-items: center;
                background-color: #f1f5f9;
                color: #0f172a;
                border: 1px solid #cbd5e1;
                padding: 5px 8px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 500;
                cursor: pointer;
              ">
                Vedi scheda ↓
              </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-show-card-${act.id}`);
        if (btn && onSelectActivity) {
          btn.onclick = () => onSelectActivity(act);
        }
      });

      marker.on('click', () => {
        if (onSelectActivity) {
          onSelectActivity(act);
        }
      });

      markersRef.current[act.id] = marker;
    });

    // Disegna la linea tratteggiata del percorso
    if (latLngs.length > 1) {
      polylineRef.current = L.polyline(latLngs, {
        color: '#475569',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.65,
      }).addTo(map);
    }

    // Centra e adatta la vista
    if (latLngs.length === 1) {
      map.setView(latLngs[0], 13);
    } else if (latLngs.length > 1) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 15 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 150);
  }, [mappedActivities, selectedActivityId, onSelectActivity]);

  // Aggiorna lo stato visivo se selectedActivityId cambia
  useEffect(() => {
    if (!selectedActivityId || !mapInstanceRef.current) return;
    const targetMarker = markersRef.current[selectedActivityId];
    if (targetMarker) {
      const latLng = targetMarker.getLatLng();
      mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
      targetMarker.openPopup();
    }
  }, [selectedActivityId]);

  // Forza refresh su resize o cambio espansione
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 200);
    }
  }, [isExpanded, isCollapsed]);

  const handleCenterRoute = () => {
    if (!mapInstanceRef.current || mappedActivities.length === 0) return;
    const latLngs = mappedActivities.map((a) => [a.lat, a.lng]);
    if (latLngs.length === 1) {
      mapInstanceRef.current.setView(latLngs[0], 13);
    } else {
      mapInstanceRef.current.fitBounds(L.latLngBounds(latLngs), { padding: [45, 45], maxZoom: 15 });
    }
  };

  if (mappedActivities.length === 0) {
    return null;
  }

  const mapHeightClass = isExpanded ? 'h-[520px]' : 'h-[280px] sm:h-[360px]';

  return (
    <div className="no-print bg-white/90 backdrop-blur-md border border-black/10 rounded-xl shadow-sm overflow-hidden mb-8 transition-all duration-300">
      {/* Intestazione Mappa */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Compass size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-sans font-semibold text-slate-900">
                Mappa dell'Itinerario
              </h3>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {mappedActivities.length} {mappedActivities.length === 1 ? 'tappa' : 'tappe'}
              </span>
            </div>
            <p className="text-xs font-sans text-slate-500 hidden sm:block">
              {dayName} • Clicca sui pin numerati per visualizzare la tappa e avviare il navigatore
            </p>
          </div>
        </div>

        {/* Pulsanti Controllo */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCenterRoute}
            title="Centra percorso"
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
          >
            <Navigation size={16} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Riduci dimensione' : 'Espandi mappa'}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Mostra mappa' : 'Nascondi mappa'}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      {/* Contenitore Mappa */}
      {!isCollapsed && (
        <div className="relative">
          <div
            ref={mapContainerRef}
            className={`w-full ${mapHeightClass} z-10 transition-all duration-300`}
            style={{ background: '#f8fafc' }}
          />
          {/* Legenda rapida in basso */}
          <div className="absolute bottom-2 left-2 z-[400] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md border border-black/10 flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block"></span>
              <span className="text-slate-700">Mattina</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              <span className="text-slate-700">Pomeriggio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block"></span>
              <span className="text-slate-700">Sera</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayMap;
