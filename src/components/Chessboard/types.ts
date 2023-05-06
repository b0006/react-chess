import { Dispatch, SetStateAction } from 'react';
import { PieceColor, PieceType, Move, Square, ChessInstance } from 'chess.js';

export type BoardCell = { type: PieceType; color: PieceColor; square: Square } | null;
export type BoardState = Array<Array<BoardCell>>;

export type PromotionPiece = Extract<PieceType, 'n' | 'b' | 'r' | 'q'>;

export interface UseChessboardProps {
  withAnimationPiece?: boolean;
  withAutopromotion?: boolean;
  autopromotionPiece?: PromotionPiece;
}

export interface PromotionState {
  isShownModal: boolean;
  move: Move | null;
}

export interface UseChessboardReturn {
  chessEngine: ChessInstance;
  boardElRef: React.RefObject<HTMLDivElement>;
  boardState: BoardState | null;
  promotionState: PromotionState;
  setPromotionState: Dispatch<SetStateAction<PromotionState>>;
  onMove: (move: Move | null, extendPromotion?: PromotionPiece) => void;
  onUndoMove: () => void;
}

export type ChessboardProps = Pick<
  UseChessboardReturn,
  'boardState' | 'chessEngine' | 'promotionState' | 'setPromotionState' | 'onMove'
>;
