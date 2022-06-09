export interface Question {
  verb: {
    answer: string;
    japanese: string;
    english: string;
  };
  example: {
    japanese: string;
    parts: string[];
    english: string
  }
  inflection: {
    formality: string,
    tense: string
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
