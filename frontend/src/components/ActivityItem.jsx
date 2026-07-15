import React from 'react';
import { ExternalLink, Lightbulb } from 'lucide-react';

export const ActivityItem = ({ activity, index, period }) => {
  // Il campo 'suggerimenti' può essere una stringa singola o un array di stringhe
  const tips = activity.suggerimenti
    ? Array.isArray(activity.suggerimenti)
      ? activity.suggerimenti
      : [activity.suggerimenti]
    : [];

  return (
    <div
      className="activity-item bg-white border border-black/10 rounded-lg p-4 smooth-transition shadow-sm hover:shadow-md"
      data-testid={`activity-${period}-${index}`}
    >
      <div className="flex gap-4">
        {/* Time */}
        <div className="flex-shrink-0">
          <span className="text-sm font-mono font-semibold text-slate-900">
            {activity.time}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-sans font-semibold text-slate-900 mb-1">
            {activity.title}
          </h4>
          {activity.description && (
            <p className="text-sm font-sans leading-relaxed text-slate-700">
              {activity.description}
            </p>
          )}

          {/* Suggerimenti (opzionale) */}
          {tips.length > 0 && (
            <div
              className="mt-3 bg-amber-50/60 border border-amber-200/60 rounded-md p-3"
              data-testid={`activity-tips-${period}-${index}`}
            >
              <div className="flex items-start gap-2">
                <Lightbulb size={14} className="flex-shrink-0 mt-0.5 text-amber-700" />
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-amber-800 mb-1" style={{ letterSpacing: '0.15em' }}>
                    Suggerimenti
                  </span>
                  {tips.length === 1 ? (
                    <p className="text-sm font-sans leading-relaxed text-amber-900">
                      {tips[0]}
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-sm font-sans leading-relaxed text-amber-900 flex gap-2"
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

          {activity.link && (
            <a
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`activity-link-${period}-${index}`}
              className="inline-flex items-center gap-1 mt-2 text-sm font-sans font-medium text-slate-900 hover:text-slate-700 smooth-transition"
            >
              <span>Vedi dettagli</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;