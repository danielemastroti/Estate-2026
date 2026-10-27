import React from 'react';
import { ExternalLink, Lightbulb, MapPin, Compass } from 'lucide-react';

export const ActivityItem = ({
  activity,
  index,
  period,
  isSelected = false,
  onFocusOnMap = null,
}) => {
  const tips = activity.suggerimenti
    ? Array.isArray(activity.suggerimenti)
      ? activity.suggerimenti
      : [activity.suggerimenti]
    : [];

  const activityId = activity.id || `${period}-${index}`;

  return (
    <div
      id={`activity-card-${activityId}`}
      className={`activity-item bg-white border rounded-lg p-4 smooth-transition shadow-sm hover:shadow-md transition-all ${
        isSelected
          ? 'border-slate-900 ring-2 ring-slate-900/10 bg-slate-50/60'
          : 'border-black/10'
      }`}
      data-testid={`activity-${period}-${index}`}
    >
      <div className="flex gap-4">
        {/* Orario e Badge Tappa */}
        <div className="flex-shrink-0 flex flex-col items-center">
          {activity.stepNumber && (
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-center mb-1 shadow-sm">
              {activity.stepNumber}
            </span>
          )}
          <span className="text-sm font-mono font-semibold text-slate-900">
            {activity.time}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-base font-sans font-semibold text-slate-900 mb-1">
            {activity.title}
          </h4>
          {activity.description && (
            <p className="text-sm font-sans leading-relaxed text-slate-700 whitespace-pre-line">
              {activity.description}
            </p>
          )}

          {tips.length > 0 && (
            <div
              className="mt-3 bg-amber-50/60 border border-amber-200/60 rounded-md p-3"
              data-testid={`activity-tips-${period}-${index}`}
            >
              <div className="flex items-start gap-2">
                <Lightbulb size={14} className="flex-shrink-0 mt-0.5 text-amber-700" />
                <div className="flex-1 min-w-0">
                  <span
                    className="block text-xs font-mono font-semibold uppercase tracking-wider text-amber-800 mb-1"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    Suggerimenti
                  </span>
                  {tips.length === 1 ? (
                    <p className="text-sm font-sans leading-relaxed text-amber-900 whitespace-pre-line">
                      {tips[0]}
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-sm font-sans leading-relaxed text-amber-900 flex gap-2 whitespace-pre-line"
                        >
                          <span className="flex-shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {(activity.link || activity.mappa || onFocusOnMap) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 pt-2 border-t border-black/5">
              {/* Focus sulla mappa integrata */}
              {onFocusOnMap && (
                <button
                  type="button"
                  onClick={() => onFocusOnMap(activityId)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
                >
                  <Compass size={13} className="text-slate-700" />
                  <span>Mostra sulla mappa</span>
                </button>
              )}

              {/* Link esterno dettagli */}
              {activity.link && (
                <a
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`activity-link-${period}-${index}`}
                  className="inline-flex items-center gap-1 text-sm font-sans font-medium text-slate-900 hover:text-slate-700 smooth-transition break-all"
                >
                  <span>Vedi dettagli</span>
                  <ExternalLink size={14} className="flex-shrink-0" />
                </a>
              )}

              {/* Link esterno Google Maps */}
              {activity.mappa && (
                <a
                  href={activity.mappa}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`activity-map-${period}-${index}`}
                  className="inline-flex items-center gap-1 text-sm font-sans font-medium text-emerald-700 hover:text-emerald-900 smooth-transition break-all"
                >
                  <MapPin size={14} className="flex-shrink-0" />
                  <span>Google Maps</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
