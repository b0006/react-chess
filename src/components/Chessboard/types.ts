import { PieceColor, PieceType, Move, Square } from 'chess.js';

export type BoardState = Array<
  Array<{ type: PieceType; color: PieceColor; square: Square } | null>
>;

export interface UseChessboardProps {
  withAnimationPiece: boolean;
}

export interface UseChessboardReturn {
  boardElRef: React.RefObject<HTMLDivElement>;
  boardState: BoardState | null;
  onMove: (move: Move) => void;
  onUndoMove: () => void;
  getPossibleMoves: () => Move[];
}

export interface ChessboardProps {
  boardState: BoardState | null;
}
