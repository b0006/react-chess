import { PieceColor, PieceType, Move, Square, ChessInstance } from 'chess.js';

export type BoardCell = { type: PieceType; color: PieceColor; square: Square } | null;
export type BoardState = Array<Array<BoardCell>>;

export interface UseChessboardProps {
  withAnimationPiece: boolean;
}

export interface UseChessboardReturn {
  chessEngine: ChessInstance;
  boardElRef: React.RefObject<HTMLDivElement>;
  boardState: BoardState | null;
  onMove: (move: Move) => void;
  onUndoMove: () => void;
}

export interface ChessboardProps {
  chessEngine: ChessInstance;
  boardState: BoardState | null;
  onClickCell?: (squareId: string, cellItem: Move | null) => void;
}
