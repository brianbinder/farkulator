export interface Player {
  name: string;
  score: number;
}

export type moveTypes = `add-player`|`add-score`|`farkle`|`add-roll`|`start-game`|`reset-total`;

export interface Move {
  score?: number;
  history?: number[];
  player?: string;
  action: moveTypes;
}