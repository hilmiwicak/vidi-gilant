export type Stop = {
  id: string
  /** Hidden until Arrival. */
  name: string
  lat: number
  lng: number
  /** Overrides the 50 m default Arrival radius. */
  radiusM?: number
  /** Leads TO this Stop. */
  puzzle: { question: string; clue: string }
  /** One photo, chosen to look the same by day and night. */
  referencePhoto: string
  outlineImage: string
  code: string
}

export type Reveal =
  | { type: 'text'; body: string }
  | { type: 'voice' | 'video'; src: string }
  | { type: 'song'; spotifyUri: string }

export type PlanId = 'a' | 'b'
