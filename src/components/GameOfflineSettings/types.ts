import { PieceColor } from 'chess.js';
import { GameData } from '../../store/offlineGame/types';
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

export type FormFields = Pick<
  GameData,
  | 'isAutoPromotion'
  | 'autopromotionPiece'
  | 'isColoredMoves'
  | 'isConfirmSteps'
  | 'isAudioOn'
  | 'difficult'
  | 'myColor'
>;
