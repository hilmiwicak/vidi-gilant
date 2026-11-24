/** The short name shown at Arrival: the part before the first comma. */
export function shortStopName(name: string): string {
  return name.split(',')[0].trim();
}
