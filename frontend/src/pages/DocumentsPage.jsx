import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yaml from 'js-yaml';
import { FileText, Phone, Mail, ExternalLink, Home, Landmark, UtensilsCrossed } from 'lucide-react';

const sectionIcon = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('appartament')) return Home;
  if (lower.includes('attrazion')) return Landmark;
  if (lower.includes('ristorant')) return UtensilsCrossed;
  return FileText;
};

export const DocumentsPage = () => {
  const [documentsData, setDocumentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/documents.yaml`);
        const parsed = yaml.load(response.data);
        setDocumentsData(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Impossibile caricare i documenti');
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400 animate-pulse" />
          <p className="text-slate-600 font-sans">Caricamento documenti...</p>
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
    <div className="documents-page" data-testid="documents-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter text-slate-900 leading-tight mb-3">
            {documentsData?.title || 'Documenti'}
          </h1>
          {documentsData?.description && (
            <p className="text-base font-sans leading-relaxed text-slate-700">
              {documentsData.description}
            </p>
          )}
        </div>

        <div className="space-y-10 mb-12">
          {documentsData?.bookings?.map((section, sIndex) => {
            const Icon = sectionIcon(section.name);
            return (
              <section key={sIndex} data-testid={`booking-section-${sIndex}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 rounded-full bg-slate-900" />
                  <Icon size={20} className="text-slate-900 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-slate-800">
                    {section.name}
                  </h2>
                </div>

                <div className="space-y-3 pl-6">
                  {section.items?.length > 0 ? (
                    section.items.map((item, iIndex) => (
                      <article
                        key={iIndex}
                        data-testid={`booking-${sIndex}-${iIndex}`}
                        className="bg-white border border-black/10 rounded-lg p-4 shadow-sm hover:shadow-md smooth-transition"
                      >
                        <h3 className="text-base sm:text-lg font-sans font-semibold text-slate-900 mb-1 whitespace-pre-line">
                          {item.title}
                        </h3>
                        {item.date && (
                          <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-500 mb-2" style={{ letterSpacing: '0.1em' }}>
                            {item.date}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-sm font-sans leading-relaxed text-slate-700 whitespace-pre-line">
                            {item.description}
                          </p>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`booking-link-${sIndex}-${iIndex}`}
                            className="inline-flex items-center gap-1 mt-3 text-sm font-sans font-medium text-slate-900 hover:text-slate-700 smooth-transition break-all"
                          >
                            <span>Apri documento</span>
                            <ExternalLink size={14} className="flex-shrink-0" />
                          </a>
                        )}
                      </article>
                    ))
                  ) : (
                    <p className="text-sm font-sans italic text-slate-500">
                      Nessuna prenotazione in questa categoria.
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {documentsData?.important_numbers && documentsData.important_numbers.length > 0 && (
          <div className="bg-slate-50 border border-black/5 rounded-lg p-6 mb-8" data-testid="important-numbers-section">
            <h2 className="text-xl font-sans font-medium text-slate-900 mb-4">
              Numeri Importanti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documentsData.important_numbers.map((num, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border border-black/5 rounded px-4 py-3"
                >
                  <span className="text-sm font-sans text-slate-700">{num.service}</span>
                  <a
                    href={`tel:${num.number}`}
                    className="text-sm font-mono font-semibold text-slate-900 hover:text-slate-700 smooth-transition"
                  >
                    {num.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {documentsData?.contacts && documentsData.contacts.length > 0 && (
          <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm" data-testid="contacts-section">
            <h2 className="text-xl font-sans font-medium text-slate-900 mb-4">
              Contatti Utili
            </h2>
            <div className="space-y-4">
              {documentsData.contacts.map((contact, index) => (
                <div key={index} className="border-b border-black/5 last:border-0 pb-4 last:pb-0">
                  <h3 className="text-base font-sans font-semibold text-slate-900 mb-2">
                    {contact.name}
                  </h3>
                  <div className="space-y-1">
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Phone size={14} className="flex-shrink-0" />
                        <a href={`tel:${contact.phone}`} className="hover:text-slate-900 smooth-transition break-all">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Mail size={14} className="flex-shrink-0" />
                        <a href={`mailto:${contact.email}`} className="hover:text-slate-900 smooth-transition break-all">
                          {contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;