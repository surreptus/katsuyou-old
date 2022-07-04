export interface Question {
  group: string;
  verb: string;
  meaning: string;
  sentences: {
    translation: string;
    original: {
      unlifted: string;
      lifted: string
    }[];
  }[];
  conjugation: string;
  inflection: {
    tense?: string;
    mood?: string;
    aspect?: string;
    formality: string;
    negated?: boolean;
  },
}

export interface Answer {
  conjugation: string;
  translated: string;
}

export enum Inflection {
  Present = 'present',
  PresentNegative = 'present-negative',
  Polite = 'polite',
  PoliteNegative = 'polite-negative',
  Past = 'past',
  PastNegative = 'past-negative',
  Te = 'te',
  TeNegative = 'te-negative'
}

export enum Group {
  Ichidan = 'ichidan',
  Godan = 'godan',
  Irregular = 'irregular'
}
