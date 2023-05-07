import { PieceColor } from 'chess.js';
import { PromotionPiece } from '../Chessboard';

export interface DificultItem {
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

export interface FormFields {
  isAutoPromotion: boolean;
  autopromotionPiece: PromotionPiece;
  isColoredMoves: boolean;
  isConfirmSteps: boolean;
  isAudioOn: boolean;
  difficult: number;
  myColor: PieceColor;
}
