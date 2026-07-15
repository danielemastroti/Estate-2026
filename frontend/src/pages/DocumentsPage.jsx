import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yaml from 'js-yaml';
import { FileText, Phone, Mail, CheckCircle2, Circle } from 'lucide-react';

export const DocumentsPage = () => {
  const [documentsData, setDocumentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Serve file YAML direttamente dalla cartella public (nessun backend necessario)
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter text-slate-900 leading-tight mb-3">
            {documentsData?.title}
          </h1>
          <p className="text-base font-sans leading-relaxed text-slate-700">
            {documentsData?.description}
          </p>
        </div>

        {/* Document Categories */}
        <div className="space-y-8 mb-12">
          {documentsData?.categories?.map((category, catIndex) => (
            <div key={catIndex} data-testid={`category-${catIndex}`}>
              <h2 className="text-2xl font-serif tracking-tight text-slate-800 mb-4">
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.items?.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    data-testid={`document-${catIndex}-${itemIndex}`}
                    className="bg-white border border-black/10 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.required ? (
                          <CheckCircle2 size={20} className="text-slate-900" />
                        ) : (
                          <Circle size={20} className="text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-sans font-semibold text-slate-900">
                            {item.title}
                          </h3>
                          {item.required && (
                            <span className="text-xs font-mono tracking-wider uppercase px-2 py-0.5 bg-slate-900 text-white rounded">
                              Obbligatorio
                            </span>
                          )}
                        </div>
                        {item.notes && (
                          <p className="text-sm font-sans text-slate-600">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Important Numbers */}
        {documentsData?.important_numbers && documentsData.important_numbers.length > 0 && (
          <div className="bg-slate-50 border border-black/5 rounded-lg p-6 mb-8">
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
                  <span className="text-sm font-mono font-semibold text-slate-900">{num.number}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts */}
        {documentsData?.contacts && documentsData.contacts.length > 0 && (
          <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
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
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Phone size={14} />
                      <a href={`tel:${contact.phone}`} className="hover:text-slate-900 smooth-transition">
                        {contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Mail size={14} />
                      <a href={`mailto:${contact.email}`} className="hover:text-slate-900 smooth-transition">
                        {contact.email}
                      </a>
                    </div>
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