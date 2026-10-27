/**
 * Coordinate e utilità geografiche per il viaggio Colmar-Icogne 2026.
 */

export const POI_COORDINATES = [
  // Colmar e dintorni
  { keywords: ['marche couvert', 'marché couvert'], coords: [48.0739, 7.3592], label: 'Marché Couvert Colmar' },
  { keywords: ['maison pfister', 'casa pfister'], coords: [48.0767, 7.3582], label: 'Maison Pfister' },
  { keywords: ['san martino', 'collegiata', 'saint-martin'], coords: [48.0773, 7.3583], label: 'Collegiata San Martino' },
  { keywords: ['subtil', 'route de bale', 'bâle', 'check-in colmar', 'casa colmar'], coords: [48.0731, 7.3620], label: 'Alloggio Colmar (Route de Bâle)' },
  { keywords: ['leclerc', 'e.leclerc'], coords: [48.0967, 7.3615], label: 'E.Leclerc Colmar' },
  { keywords: ['petite venice', 'petite venise', 'little venice'], coords: [48.0740, 7.3595], label: 'Petite Venise Colmar' },
  { keywords: ['barca', 'sweet narcisse'], coords: [48.0743, 7.3598], label: 'Imbarco Giro in Barca Colmar' },
  { keywords: ['unterlinden'], coords: [48.0797, 7.3556], label: 'Museo Unterlinden' },
  { keywords: ['colmar', 'old town', 'centro storico colmar'], coords: [48.0765, 7.3580], label: 'Centro Storico Colmar' },

  // Friburgo in Brisgovia
  { keywords: ['bissierstrasse', 'bissierstraße', 'p&r bissier', 'parcheggio friburgo'], coords: [48.0016, 7.8228], label: 'P&R Bissierstraße Friburgo' },
  { keywords: ['bertoldsbrunnen'], coords: [47.9950, 7.8496], label: 'Bertoldsbrunnen Friburgo' },
  { keywords: ['munsterplatz', 'münsterplatz'], coords: [47.9956, 7.8529], label: 'Münsterplatz Friburgo' },
  { keywords: ['cattedrale di nostra signora', 'duomo di friburgo', 'freiburger münster'], coords: [47.9956, 7.8529], label: 'Cattedrale di Friburgo' },
  { keywords: ['munstermarkt', 'münstermarkt'], coords: [47.9954, 7.8526], label: 'Münstermarkt Friburgo' },
  { keywords: ['schlossbergbahn', 'funicolare'], coords: [47.9965, 7.8580], label: 'Funicolare Schlossberg' },
  { keywords: ['schlossberg'], coords: [47.9961, 7.8603], label: 'Schlossberg Friburgo' },
  { keywords: ['bachle', 'bächle'], coords: [47.9942, 7.8517], label: 'Bächle Friburgo' },
  { keywords: ['kastaniengarten'], coords: [47.9945, 7.8573], label: 'Biergarten Kastaniengarten' },
  { keywords: ['friburgo', 'freiburg'], coords: [47.9950, 7.8500], label: 'Friburgo in Brisgovia' },

  // Strada dei Vini d'Alsazia
  { keywords: ['riquewihr'], coords: [48.1669, 7.2974], label: 'Riquewihr' },
  { keywords: ['eguisheim', 'enguisheim', 'fortezza a enguisheim'], coords: [48.0427, 7.3060], label: 'Eguisheim' },
  { keywords: ['castello di kaysersberg', 'castello kaysersberg'], coords: [48.1398, 7.2605], label: 'Castello di Kaysersberg' },
  { keywords: ['kaysersberg'], coords: [48.1394, 7.2624], label: 'Kaysersberg' },
  { keywords: ['freyburger', 'marcel freyburger', 'degustazione vini'], coords: [48.1256, 7.2762], label: 'Cantina Marcel Freyburger' },
  { keywords: ['ribeauville', 'ribeauvillé'], coords: [48.1947, 7.3181], label: 'Ribeauvillé' },
  { keywords: ['haut-koenigsbourg', 'haut koenigsbourg'], coords: [48.2495, 7.3444], label: 'Château du Haut-Kœnigsbourg' },

  // Foresta Nera
  { keywords: ['titisee', 'lago titisee'], coords: [47.9022, 8.1534], label: 'Lago Titisee' },
  { keywords: ['cascate triberg', 'cascate di triberg'], coords: [48.1285, 8.2285], label: 'Cascate di Triberg' },
  { keywords: ['triberg'], coords: [48.1305, 8.2325], label: 'Triberg' },
  { keywords: ['schonach', 'cucù', 'cucu'], coords: [48.1436, 8.2014], label: 'Orologio a Cucù più grande (Schonach)' },
  { keywords: ['todtnau'], coords: [47.8415, 7.9450], label: 'Cascate di Todtnau' },

  // Strasburgo
  { keywords: ['cattedrale di strasburgo', 'notre-dame strasbourg', 'cattedrale strasburgo'], coords: [48.5818, 7.7509], label: 'Cattedrale di Strasburgo' },
  { keywords: ['petite france'], coords: [48.5806, 7.7409], label: 'Petite France Strasburgo' },
  { keywords: ['palais rohan'], coords: [48.5813, 7.7522], label: 'Palais Rohan' },
  { keywords: ['barrage vauban', 'ponts couverts'], coords: [48.5796, 7.7378], label: 'Barrage Vauban' },
  { keywords: ['baggersee', 'p+r baggersee'], coords: [48.5524, 7.7329], label: 'P+R Baggersee Strasburgo' },
  { keywords: ['strasburgo', 'strasbourg'], coords: [48.5834, 7.7459], label: 'Strasburgo Centro' },

  // Svizzera - Icogne e Vallese
  { keywords: ['cachiblio', 'villa icogne', 'casa icogne', 'check-in icogne', 'icogne'], coords: [46.2991, 7.4357], label: 'Icogne (Casa / Villa)' },
  { keywords: ['crans-montana', 'crans montana'], coords: [46.3120, 7.4819], label: 'Crans-Montana' },
  { keywords: ['tourbillon', 'castello di tourbillon'], coords: [46.2366, 7.3683], label: 'Castello di Tourbillon (Sion)' },
  { keywords: ['valere', 'valère', 'basilica di valère'], coords: [46.2336, 7.3692], label: 'Castello e Basilica di Valère' },
  { keywords: ['sion'], coords: [46.2331, 7.3606], label: 'Sion (Centro Storico)' },
  { keywords: ['st-leonard', 'san leonardo', 'lago sotterraneo'], coords: [46.2570, 7.4262], label: 'Lago Sotterraneo St-Léonard' },

  // Zermatt e Gornergrat
  { keywords: ['gornergrat'], coords: [45.9833, 7.7844], label: 'Gornergrat (3.089m)' },
  { keywords: ['rotenboden', 'riffelsee'], coords: [45.9845, 7.7712], label: 'Rotenboden & Lago Riffelsee' },
  { keywords: ['riffelberg'], coords: [45.9922, 7.7533], label: 'Riffelberg' },
  { keywords: ['riffelalp'], coords: [46.0022, 7.7550], label: 'Riffelalp' },
  { keywords: ['findelbach'], coords: [46.0125, 7.7570], label: 'Findelbach' },
  { keywords: ['zermatt ggb', 'stazione zermatt', 'zermatt'], coords: [46.0244, 7.7490], label: 'Zermatt Centro / Stazione' },
  { keywords: ['parkhaus zermatt', 'parcheggio zermatt', 'tasch', 'täsch'], coords: [46.0674, 7.7770], label: 'Matterhorn Terminal Täsch (Parcheggio Zermatt)' },

  // Punti di partenza e arrivo
  { keywords: ['settimo milanese', 'partenza da settimo', 'rientro berry'], coords: [45.4795, 9.0556], label: 'Settimo Milanese' },
  { keywords: ['craveggia', 'rientro tasc'], coords: [46.1383, 8.5028], label: 'Craveggia' },
];

/**
 * Tenta di estrarre coordinate valide da un'attività.
 * Priorità:
 * 1. Proprietà esplicita coords (es. [lat, lng] o { lat, lng })
 * 2. Parsing dai parametri dell'URL di Google Maps
 * 3. Match testuale con il dizionario dei punti di interesse
 */
export function resolveCoordinates(activity) {
  if (!activity) return null;

  // 1. Coordinate esplicite nel YAML
  if (Array.isArray(activity.coords) && activity.coords.length === 2) {
    const [lat, lng] = activity.coords;
    if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
      return { lat, lng, source: 'explicit' };
    }
  }

  if (activity.coords && typeof activity.coords.lat === 'number' && typeof activity.coords.lng === 'number') {
    return { lat: activity.coords.lat, lng: activity.coords.lng, source: 'explicit' };
  }

  // 2. Parsing URL Google Maps se presente
  if (activity.mappa && typeof activity.mappa === 'string') {
    const url = activity.mappa;
    // Cerca pattern come @48.1234,7.5678 o q=48.1234,7.5678 o ll=48.1234,7.5678
    const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]), source: 'map_url' };
    }
    const qMatch = url.match(/[?&](?:q|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]), source: 'map_url' };
    }
  }

  // 3. Match testuale basato su titolo, descrizione o link
  const textCorpus = [
    activity.title || '',
    activity.description || '',
    activity.suggerimenti || '',
    activity.link || '',
    activity.mappa || '',
  ].join(' ').toLowerCase();

  for (const poi of POI_COORDINATES) {
    const matched = poi.keywords.some((kw) => textCorpus.includes(kw.toLowerCase()));
    if (matched) {
      return {
        lat: poi.coords[0],
        lng: poi.coords[1],
        label: poi.label,
        source: 'poi_match',
      };
    }
  }

  return null;
}

/**
 * Genera l'URL di navigazione stradale Google Maps per una coordinata.
 */
export function getDirectionsUrl(lat, lng, label = '') {
  const query = label ? encodeURIComponent(label) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${query}`;
}
