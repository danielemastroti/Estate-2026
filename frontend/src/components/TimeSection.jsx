import React from 'react';
import ActivityItem from './ActivityItem';

export const TimeSection = ({
  title,
  activities,
  color,
  period,
  selectedActivityId = null,
  onFocusOnMap = null,
}) => {
  return (
    <div className="time-section" data-testid={`time-section-${period}`}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1.5 h-8 rounded-full shadow-sm"
          style={{ backgroundColor: color }}
        />
        <h3 className="text-xl font-sans font-medium text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-3 pl-2 sm:pl-6">
        {activities.map((activity, index) => {
          const actId = activity.id || `${period}-${index}`;
          return (
            <ActivityItem
              key={actId}
              activity={activity}
              index={index}
              period={period}
              isSelected={selectedActivityId === actId}
              onFocusOnMap={onFocusOnMap}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimeSection;
