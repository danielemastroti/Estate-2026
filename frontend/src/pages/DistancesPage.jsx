import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yaml from 'js-yaml';
import { MapPin, Navigation } from 'lucide-react';

export const DistancesPage = () => {
  const [distancesData, setDistancesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistances = async () => {
      try {
        // Serve file YAML direttamente dalla cartella public (nessun backend necessario)
        const response = await axios.get(`${process.env.PUBLIC_URL}/distances.yaml`);
        const parsed = yaml.load(response.data);
        setDistancesData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error loading distances:', err);
        setError('Impossibile caricare le distanze');
        setLoading(false);
      }
    };

    fetchDistances();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-400 animate-pulse" />
          <p className="text-slate-600 font-sans">Caricamento distanze...</p>
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
    <div className="distances-page" data-testid="distances-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter text-slate-900 leading-tight mb-3">
            {distancesData?.title}
          </h1>
          <p className="text-base font-sans leading-relaxed text-slate-700">
            {distancesData?.description}
          </p>
        </div>

        {/* Routes */}
        <div className="space-y-4 mb-12">
          {distancesData?.routes?.map((route, index) => (
            <div
              key={index}
              data-testid={`route-${index}`}
              className="bg-white border border-black/10 rounded-lg p-6 shadow-sm hover:shadow-md smooth-transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Navigation size={20} className="text-slate-900" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-base font-sans font-semibold text-slate-900">
                      {route.from}
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="text-base font-sans font-semibold text-slate-900">
                      {route.to}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-2">
                    <span className="text-sm font-mono text-slate-700">
                      📍 {route.distance}
                    </span>
                    <span className="text-sm font-mono text-slate-700">
                      ⏱️ {route.duration}
                    </span>
                  </div>
                  {route.notes && (
                    <p className="text-sm font-sans text-slate-600 italic">
                      {route.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        {distancesData?.tips && distancesData.tips.length > 0 && (
          <div className="bg-slate-50 border border-black/5 rounded-lg p-6">
            <h2 className="text-xl font-sans font-medium text-slate-900 mb-4">
              Consigli Utili
            </h2>
            <ul className="space-y-2">
              {distancesData.tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm font-sans leading-relaxed text-slate-700 flex gap-2"
                >
                  <span className="text-slate-900">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistancesPage;