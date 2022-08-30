import { PieceColor, PieceType, Move, Square } from 'chess.js';

export type BoardCell = { type: PieceType; color: PieceColor; square: Square } | null;
export type BoardState = Array<Array<BoardCell>>;

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
  onClickCell?: (squareId: string, cellItem?: BoardCell) => void;
}
