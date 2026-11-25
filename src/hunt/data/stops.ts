import type { Stop } from '../types';

// Coordinates are placeholders. Replace each with its Capture here value on a scouting visit.
// Photos, outlines and Codes are placeholders too: the files do not exist yet.
function stop(id: string, fields: Omit<Stop, 'id' | 'referencePhoto' | 'outlineImage'>): Stop {
  return {
    id,
    referencePhoto: `/stops/${id}/reference.jpg`,
    outlineImage: `/stops/${id}/outline.svg`,
    ...fields,
  };
}

export const lot17 = stop('lot-17', {
  name: 'Lot 17 parking lot, SCBD',
  lat: -6.22903093354103,
  lng: 106.80901387133515,
  puzzle: {
    lead: 'Where do we usually go',
    phrase: 'sightseeing?',
    clue: 'Banyak orang minum dan nongkrong dgn bagasi mobilnya dibuka di sini',
  },
  code: 'PLACEHOLDER-LOT-17',
});

export const coldMoo = stop('cold-moo', {
  name: 'Cold Moo, Dharmawangsa',
  lat: -6.253226813726469,
  lng: 106.80144366204998,
  puzzle: {
    lead: 'Where did we go on our',
    phrase: 'first ice cream date?',
    clue: 'Kamu marah that day gara-gara aku telat wkwk.',
  },
  code: 'PLACEHOLDER-COLD-MOO',
});

export const supagetti = stop('supagetti', {
  name: 'Supagetti, Prapanca',
  lat: -6.256024489702303,
  lng: 106.80581875041308,
  puzzle: {
    lead: 'What is the place that needs',
    phrase: 'a reservation on Monday?',
    clue: 'Italian and Japanese mix, near Daring Deli.',
  },
  code: 'PLACEHOLDER-SUPAGETTI',
});

/** The fixed Hunt order. The last Stop is the dinner. */
export const stops: readonly Stop[] = [lot17, coldMoo, supagetti];
