import { PieceColor } from 'chess.js';
import { OfflineStartParty } from '../../store/partyStore/types';
import { PromotionPiece } from '../Chessboard';

export interface GameOfflineSettingsProps {
  onClose: () => void;
}

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

export type FormFields = OfflineStartParty;
