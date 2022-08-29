import { ChessInstance, PieceColor, PieceType, Move, Square } from 'chess.js';

export type BoardState = Array<
  Array<{ type: PieceType; color: PieceColor; square: Square } | null>
>;

export interface UseChessboard {
  chessEngine: ChessInstance;
  nextMove: Move | null;
  setNextMove: React.Dispatch<React.SetStateAction<Move | null>>;
  initBoardState: BoardState;
}

export interface ChessboardProps {
  nextMove: Move | null;
  initBoardState: BoardState | null;
  chessEngine: ChessInstance;
}
