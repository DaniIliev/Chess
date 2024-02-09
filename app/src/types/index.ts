export type Piece = {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
};

export enum TeamType {
  OPPONENT,
  OUR,
}

export enum PieceType {
  PAWN,
  BITSHOP,
  KNIGHT,
  ROCK,
  QUEEN,
  KING,
}
