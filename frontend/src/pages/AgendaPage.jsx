import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yaml from 'js-yaml';
import DaySelector from '@/components/DaySelector';
import TimeSection from '@/components/TimeSection';
import PrintButton from '@/components/PrintButton';
import { Calendar } from 'lucide-react';

export const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const currentDay = agendaData?.days?.find(d => d.id === selectedDay);

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
              Agenda Viaggio Estate 2026 - Colmar e Icogne
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
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-slate-800 mb-2">
                {currentDay.name}
              </h2>
              <p className="text-base font-mono tracking-widest uppercase text-slate-500" style={{ letterSpacing: '0.2em' }}>
                {currentDay.date}
              </p>
            </div>

            <div className="space-y-8">
              {currentDay.morning && currentDay.morning.length > 0 && (
                <TimeSection
                  title="Mattina"
                  activities={currentDay.morning}
                  color="#D4C5B9"
                  period="morning"
                />
              )}

              {currentDay.afternoon && currentDay.afternoon.length > 0 && (
                <TimeSection
                  title="Pomeriggio"
                  activities={currentDay.afternoon}
                  color="#A3B1A6"
                  period="afternoon"
                />
              )}

              {currentDay.evening && currentDay.evening.length > 0 && (
                <TimeSection
                  title="Sera"
                  activities={currentDay.evening}
                  color="#2C3E50"
                  period="evening"
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