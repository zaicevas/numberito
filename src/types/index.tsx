export enum KeyType {
  Number,
  Check,
  Delete,
}

export interface SingleGuess {
  input: string;
  bulls: number;
  cows: number;
}

export interface Slide {
  key: string;
  title: string;
  text: React.ReactNode;
  example?: React.ReactNode;
  backgroundColor: string;
}
