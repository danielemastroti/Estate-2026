import React from 'react';

export const DaySelector = ({ days, selectedDay, onSelectDay }) => {
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(`[data-day-id="${selectedDay}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDay]);

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {days.map((day) => (
          <button
            key={day.id}
            data-day-id={day.id}
            data-testid={`day-tab-${day.id}`}
            onClick={() => onSelectDay(day.id)}
            className={
              `flex-shrink-0 px-6 py-3 rounded-lg font-sans font-medium smooth-transition ${
                selectedDay === day.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-black/10'
              }`
            }
          >
            <div className="text-center">
              <div className="text-sm font-semibold">{day.name}</div>
              <div className="text-xs opacity-80 mt-1">{day.date.split(' ')[0]}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;