import type { Stop } from '../types'

// Coordinates are placeholders. Replace each with its Capture here value on a scouting visit.
// Photos, outlines and Codes are placeholders too: the files do not exist yet.
function stop(id: string, fields: Omit<Stop, 'id' | 'referencePhoto' | 'outlineImage'>): Stop {
  return {
    id,
    referencePhoto: `/stops/${id}/reference.jpg`,
    outlineImage: `/stops/${id}/outline.svg`,
    ...fields,
  }
}

export const pandanHaur = stop('pandan-haur', {
  name: 'Pandan Haur, Fresh Market Emerald Bintaro',
  // Approximate: the Emerald Bintaro area, not the shop.
  lat: -6.2782781,
  lng: 106.6997324,
  puzzle: {
    question: 'Where do you usually buy kue cucur?',
    clue: 'Your "safe space", yang di mana kamu takut kalau tiba-tiba ketemu orang tua aku wkwk.',
  },
  code: 'PLACEHOLDER-PANDAN-HAUR',
})

export const popeyes = stop('popeyes-parigi', {
  name: 'Popeyes Bintaro, Parigi',
  lat: -6.2676133,
  lng: 106.6919826,
  puzzle: {
    question: 'Where did we eat together for the first time?',
    clue: 'Ada burger yang gak abis, jadi aku bawa pulang. Besoknya Idul Adha.',
  },
  code: 'PLACEHOLDER-POPEYES',
})

export const naomiYura = stop('naomi-yura', {
  name: 'Naomi Yura Agency',
  // Approximate: central Kebayoran Baru, not the studio.
  lat: -6.2437,
  lng: 106.7993,
  puzzle: {
    question: 'Where did we go for our first photobox?',
    clue: 'Vintage, Kebayoran.',
  },
  code: 'PLACEHOLDER-NAOMI-YURA',
})

export const coldMoo = stop('cold-moo', {
  name: 'Cold Moo, Dharmawangsa',
  lat: -6.2528688,
  lng: 106.8010677,
  puzzle: {
    question: 'Where did we go on our first ice cream date?',
    clue: 'Kamu marah that day gara-gara aku telat wkwk.',
  },
  code: 'PLACEHOLDER-COLD-MOO',
})

export const lot17 = stop('lot-17', {
  name: 'Lot 17 parking lot, SCBD',
  lat: -6.2294277,
  lng: 106.8086039,
  puzzle: {
    question: 'Where do we usually go sightseeing?',
    clue: 'Banyak orang minum dan nongkrong dgn bagasi mobilnya dibuka di sini',
  },
  code: 'PLACEHOLDER-LOT-17',
})

export const supagetti = stop('supagetti', {
  name: 'Supagetti, Prapanca',
  // Prapanca Raya No. 18.
  lat: -6.2507752,
  lng: 106.8095649,
  puzzle: {
    question: 'What is the place that needs a reservation on Monday?',
    clue: 'Italian and Japanese mix, near Daring Deli.',
  },
  code: 'PLACEHOLDER-SUPAGETTI',
})
