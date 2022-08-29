import { ChessInstance, PieceColor, PieceType, Move, Square } from 'chess.js';

export type BoardState = Array<
  Array<{ type: PieceType; color: PieceColor; square: Square } | null>
>;

export interface UseChessboardReturn {
  chessEngine: ChessInstance;
  nextMove: Move | null;
  onMove: (move: Move) => void;
  boardState: BoardState | null;
}

export interface ChessboardProps {
  // nextMove: Move | null;
  boardState: BoardState | null;
  // chessEngine: ChessInstance;
}
