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
