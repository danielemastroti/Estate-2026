import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ActivityItem = ({ activity, index, period }) => {
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