import { ChessInstance, PieceColor, PieceType, ShortMove, Square } from 'chess.js';

export type BoardState = Array<
  Array<{ type: PieceType; color: PieceColor; square: Square } | null>
>;

export interface UseChessboard {
  chessRef: React.MutableRefObject<ChessInstance>;
  lastMove: ShortMove | null;
  setLastMove: React.Dispatch<React.SetStateAction<ShortMove | null>>;
  initBoardState: BoardState;
}

export interface ChessboardProps {
  lastMove: ShortMove | null;
  initBoardState: BoardState | null;
}
