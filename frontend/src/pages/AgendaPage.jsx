import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import * as yaml from 'js-yaml';
import DaySelector from '@/components/DaySelector';
import TimeSection from '@/components/TimeSection';
import PrintButton from '@/components/PrintButton';
import DayMap from '@/components/DayMap';
import { Calendar } from 'lucide-react';

export const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapSectionRef = useRef(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        // Serve file YAML direttamente dalla cartella public (nessun backend necessario)
        const response = await axios.get(`${process.env.PUBLIC_URL}/agenda.yaml`);
        const parsed = yaml.load(response.data);
        setAgendaData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error loading agenda:', err);
        setError('Impossibile caricare l\'agenda');
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  // Quando si cambia giorno, resetta la selezione
  useEffect(() => {
    setSelectedActivityId(null);
  }, [selectedDay]);

  const currentDay = agendaData?.days?.find((d) => d.id === selectedDay);

  // Prepara le attività del giorno con step numerato progressivo e id univoco
  const { allDayActivities, morningActivities, afternoonActivities, eveningActivities } = useMemo(() => {
    if (!currentDay) {
      return {
        allDayActivities: [],
        morningActivities: [],
        afternoonActivities: [],
        eveningActivities: [],
      };
    }

    let stepCounter = 1;

    const mapWithStep = (items, period) => {
      if (!items || !Array.isArray(items)) return [];
      return items.map((item, index) => {
        const stepNumber = stepCounter++;
        const id = `${period}-${index}`;
        return {
          ...item,
          stepNumber,
          id,
          period,
          periodIndex: index,
        };
      });
    };

    const morning = mapWithStep(currentDay.morning, 'morning');
    const afternoon = mapWithStep(currentDay.afternoon, 'afternoon');
    const evening = mapWithStep(currentDay.evening, 'evening');

    return {
      allDayActivities: [...morning, ...afternoon, ...evening],
      morningActivities: morning,
      afternoonActivities: afternoon,
      eveningActivities: evening,
    };
  }, [currentDay]);

  const handleSelectActivityFromMap = (activity) => {
    setSelectedActivityId(activity.id);
    const element = document.getElementById(`activity-card-${activity.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFocusOnMap = (activityId) => {
    setSelectedActivityId(activityId);
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400 animate-pulse" />
          <p className="text-slate-600 font-sans">Caricamento agenda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-sans">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agenda-page">
      {/* Sticky Header with Day Selector */}
      <div 
        className="glass-header sticky top-0 z-40 no-print"
        data-testid="agenda-header"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tighter text-slate-900">
              Colmar-Icogne - 2026
            </h1>
            <PrintButton />
          </div>
          <DaySelector
            days={agendaData?.days || []}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>
      </div>

      {/* Day Content */}
      <div className="agenda-content max-w-4xl mx-auto px-4 py-8">
        {currentDay ? (
          <div className="day-section" data-testid={`day-content-${currentDay.id}`}>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-slate-800 mb-2">
                {currentDay.name}
              </h2>
              <p
                className="text-base font-mono tracking-widest uppercase text-slate-500"
                style={{ letterSpacing: '0.2em' }}
              >
                {currentDay.date}
              </p>
            </div>

            {/* Mappa interattiva del giorno */}
            <div ref={mapSectionRef}>
              <DayMap
                activities={allDayActivities}
                dayName={currentDay.name}
                selectedActivityId={selectedActivityId}
                onSelectActivity={handleSelectActivityFromMap}
              />
            </div>

            {/* Attività divise per orario */}
            <div className="space-y-8">
              {morningActivities.length > 0 && (
                <TimeSection
                  title="Mattina"
                  activities={morningActivities}
                  color="#D4C5B9"
                  period="morning"
                  selectedActivityId={selectedActivityId}
                  onFocusOnMap={handleFocusOnMap}
                />
              )}

              {afternoonActivities.length > 0 && (
                <TimeSection
                  title="Pomeriggio"
                  activities={afternoonActivities}
                  color="#A3B1A6"
                  period="afternoon"
                  selectedActivityId={selectedActivityId}
                  onFocusOnMap={handleFocusOnMap}
                />
              )}

              {eveningActivities.length > 0 && (
                <TimeSection
                  title="Sera"
                  activities={eveningActivities}
                  color="#2C3E50"
                  period="evening"
                  selectedActivityId={selectedActivityId}
                  onFocusOnMap={handleFocusOnMap}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 font-sans">Seleziona un giorno per vedere i dettagli</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaPage;
