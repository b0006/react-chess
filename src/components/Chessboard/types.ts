import { Dispatch, SetStateAction, RefObject } from 'react';
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

export interface OnMoveProps {
  move: Move | null;
  extendPromotion?: PromotionPiece;
}

export interface UseChessboardReturn {
  chessEngine: ChessInstance;
  boardElRef: RefObject<HTMLDivElement>;
  boardState: BoardState | null;
  promotionState: PromotionState;
  setPromotionState: Dispatch<SetStateAction<PromotionState>>;
  onMove: (options: OnMoveProps) => void;
  onUndoMove: () => void;
}

export interface ChessboardProps
  extends Pick<
    UseChessboardReturn,
    'boardState' | 'chessEngine' | 'promotionState' | 'setPromotionState' | 'onMove'
  > {
  isEnemyMoving?: boolean;
  myColor: PieceColor;
}

export interface ChessEngine {
  postMessage: (line: string) => void;
  onmessage: (event: string) => void;
}
