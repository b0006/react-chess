import { Dispatch, SetStateAction, RefObject } from 'react';
import { PieceColor, PieceType, Move, Square, ChessInstance } from 'chess.js';
import { GameOverState } from './hooks/types';

export type BoardCell = { type: PieceType; color: PieceColor; square: Square } | null;
export type BoardState = Array<Array<BoardCell>>;

export type PromotionPiece = Extract<PieceType, 'n' | 'b' | 'r' | 'q'>;

export interface OnMoveCallback {
  fen: string;
  pgn: string;
}

export interface UseChessboardProps {
  initStatus?: {
    fen: string;
    pgn: string;
  };
  withAnimationPiece?: boolean;
  withAutopromotion?: boolean;
  autopromotionPiece?: PromotionPiece;
  onMoveCallback?: (status: OnMoveCallback) => void;
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
  gameOverState: GameOverState;
  setPromotionState: Dispatch<SetStateAction<PromotionState>>;
  onMove: (options: OnMoveProps) => void;
  onUndoMove: () => void;
}

export interface ChessboardProps
  extends Pick<
    UseChessboardReturn,
    | 'boardState'
    | 'chessEngine'
    | 'promotionState'
    | 'gameOverState'
    | 'setPromotionState'
    | 'onMove'
  > {
  isEnemyMoving?: boolean;
  myColor: PieceColor;
}

export interface ChessEngine {
  postMessage: (line: string) => void;
  onmessage: (event: string) => void;
}

export interface DifficultItem {
  label: string;
  value: number;
}

export interface ColorItem {
  label: string;
  value: PieceColor;
}

export interface AutoPromotionItem {
  label: string;
  value: PromotionPiece;
}
