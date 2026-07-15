import React from 'react';
import ActivityItem from './ActivityItem';

export const TimeSection = ({ title, activities, color, period }) => {
  return (
    <div className="time-section" data-testid={`time-section-${period}`}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3 className="text-xl font-sans font-medium text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-3 pl-6">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            index={index}
            period={period}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSection;