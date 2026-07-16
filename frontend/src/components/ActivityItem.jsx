
Creatore di app
Wingman

Home

agenda-mobile-6


Crediti Boost
30% in più

User Avatar


code
Code

preview
Preview

Pubblica
Loading...
Ora ti spiego tutti i modi per andare a capo in YAML per i 3 casi.

📝 Guida ai Testi Lunghi in YAML
🔤 Caso 1: description e suggerimenti (testi normali)
Hai 3 opzioni in base a cosa vuoi ottenere:

Opzione A — Solo leggibilità nel file YAML (una riga a schermo)
Usa il simbolo > (chiamato "folded"). I newline nel file diventano spazi nel testo mostrato:

description: >
  Questa è una descrizione molto lunga
  che nel file YAML occupa più righe
  ma verrà mostrata come una riga unica.
Rendering: Questa è una descrizione molto lunga che nel file YAML occupa più righe ma verrà mostrata come una riga unica.

Opzione B — Andare a capo davvero nel testo mostrato
Usa il simbolo | (chiamato "literal"). I newline vengono preservati:

description: |
  Prima riga della descrizione.
  Seconda riga a capo.
  Terza riga a capo.
Rendering:

Prima riga della descrizione.
Seconda riga a capo.
Terza riga a capo.
Opzione C — Riga singola con \n esplicito
Usa virgolette doppie e \n dove vuoi il capo:

description: "Prima riga.\nSeconda riga.\nTerza riga."
Rendering:

Prima riga.
Seconda riga.
Terza riga.
💡 Stessa cosa per suggerimenti
suggerimenti:
  - >
    Suggerimento lungo che nel file
    va a capo per leggibilità ma sarà
    una sola riga a schermo.
  - |
    Suggerimento con
    a capo veri.
  - "Suggerimento breve normale"
🔗 Caso 2: link (URL lunghi)
Gli URL devono restare una sola stringa (non puoi andare a capo dentro un URL). Ma nel file YAML puoi comunque scriverli in modo pulito:

Opzione A — Su una riga (semplice)
link: "https://www.esempio.it/percorso/molto/lungo/pagina?param=valore&altro=x"
Opzione B — Usando >- (folded senza newline finale)
Il - alla fine rimuove il newline finale, e > concatena in spazio... MA per URL non puoi avere spazi. Quindi devi accodare senza spazi:

Non farlo per gli URL — usa sempre una riga sola. ⚠️

Opzione C — Con backslash \ (per virgolette doppie)
Non è YAML standard, meglio evitare.

👉 Regola d'oro: gli URL scrivili sempre su una sola riga. Se il file YAML diventa scomodo da leggere, ho già aggiunto break-all sul link nell'interfaccia, quindi anche URL lunghi si adattano bene visivamente.

📚 Esempio Completo
- time: "10:00"
  title: "Visita Museo Nazionale"
  description: >
    Tour guidato in italiano che dura circa 2 ore. Include la visita
    delle sale principali e una degustazione al termine.
  link: "https://www.museonazionale.it/percorso/lungo?param=1&biglietto=intero"
  suggerimenti:
    - "Prenotare online per evitare la coda"
    - >
      Portare un maglione — la temperatura interna è mantenuta
      bassa per la conservazione delle opere.
    - |
      Non perdere:
      • Sala del Rinascimento
      • Statua di marmo al 2° piano
      • Cortile interno
🎯 Riepilogo Rapido
Simbolo	Uso	Nel testo mostrato
>	Righe multiple → una riga	Newline diventa spazio
|	Righe multiple → righe multiple	Newline rispettato
"..."	Una riga con \n	\n diventa a capo
Semplice testo	Una riga breve	Nessun capo
📄 File Aggiornato
Ho aggiornato ActivityItem.jsx per:

✅ Rispettare i \n in description e suggerimenti (whitespace-pre-line)
✅ Spezzare URL lunghi nel bottone "Vedi dettagli" (break-all)
Contenuto completo aggiornato di frontend/src/components/ActivityItem.jsx:

import React from 'react';
import { ExternalLink, Lightbulb } from 'lucide-react';

export const ActivityItem = ({ activity, index, period }) => {
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
        <div className="flex-shrink-0">
          <span className="text-sm font-mono font-semibold text-slate-900">
            {activity.time}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-base font-sans font-semibold text-slate-900 mb-1">
            {activity.title}
          </h4>
          {activity.description && (
            <p className="text-sm font-sans leading-relaxed text-slate-700 whitespace-pre-line">
              {activity.description}
            </p>
          )}

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
                    <p className="text-sm font-sans leading-relaxed text-amber-900 whitespace-pre-line">
                      {tips[0]}
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-sm font-sans leading-relaxed text-amber-900 flex gap-2 whitespace-pre-line"
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
              className="inline-flex items-center gap-1 mt-2 text-sm font-sans font-medium text-slate-900 hover:text-slate-700 smooth-transition break-all"
            >
              <span>Vedi dettagli</span>
              <ExternalLink size={14} className="flex-shrink-0" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
