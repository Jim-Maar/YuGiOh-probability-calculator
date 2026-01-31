import LZString from 'lz-string';
import { Card } from '../types/card';
import { DNF } from '../types/dnf';

const MAX_URL_LENGTH = 1800;

export type AppState = {
  deckSize: number;
  handSize: number;
  cards: Card[];
  hands: DNF[];
};

export function serializeState(state: AppState): string | null {
  try {
    const json = JSON.stringify(state);
    const compressed = LZString.compressToEncodedURIComponent(json);

    if (compressed.length > MAX_URL_LENGTH) {
      return null; // Too large
    }

    return compressed;
  } catch {
    return null;
  }
}

export function deserializeState(hash: string): AppState | null {
  try {
    if (!hash) return null;

    const json = LZString.decompressFromEncodedURIComponent(hash);
    if (!json) return null;

    const state = JSON.parse(json) as AppState;

    // Basic validation
    if (
      typeof state.deckSize !== 'number' ||
      typeof state.handSize !== 'number' ||
      !Array.isArray(state.cards) ||
      !Array.isArray(state.hands)
    ) {
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

export function updateUrlHash(state: AppState): boolean {
  const serialized = serializeState(state);

  if (serialized === null) {
    return false; // Too large or error
  }

  // Use replaceState to avoid polluting browser history
  const newUrl = `${window.location.pathname}#${serialized}`;
  window.history.replaceState(null, '', newUrl);
  return true;
}

export function getStateFromUrl(): AppState | null {
  const hash = window.location.hash.slice(1); // Remove leading #
  return deserializeState(hash);
}
