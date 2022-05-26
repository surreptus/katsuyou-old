export interface Question {
  verb: string;
  sentence: string;
}

export interface Answer {
  conjugation: string;
  translated: string;
}

export enum Inflection {
  Present,
  PresentNegative,
  Polite,
  PoliteNegative,
  Past,
  PastNegative,
  Te,
  TeNegative
}

export enum Group {
  Ichidan,
  Godan,
  Irregular 
}
