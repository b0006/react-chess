import { ChessGameOver } from '../../store/partyStore/types';
import { AutoPromotionItem, ColorItem, DifficultItem } from './types';

export const DIGIT_LIST = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
export const SYMBOL_LIST = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const PROMOTION_PIECE: AutoPromotionItem[] = [
  { label: 'Queen', value: 'q' },
  { label: 'Bishop', value: 'b' },
  { label: 'Knight', value: 'n' },
  { label: 'Rook', value: 'r' },
];

export const AI_DIFFICULT: DifficultItem[] = [
  { label: '800 (Easy)', value: 1 },
  { label: '1000', value: 3 },
  { label: '1200', value: 5 },
  { label: '1400', value: 7 },
  { label: '1600', value: 9 },
  { label: '1800', value: 11 },
  { label: '2000', value: 13 },
  { label: '2200 (Hard)', value: 15 },
];

export const COLOR_LIST: ColorItem[] = [
  { label: 'White', value: 'w' },
  { label: 'Black', value: 'b' },
];

export const GAME_OVER_LABEL: Record<ChessGameOver, string> = {
  checkmate: 'Checkmate',
  draw: 'Draw',
  insufficientMaterial: 'Insufficient material',
  stalemate: 'Stalemate',
  threefoldRepetition: 'Threefold repetition',
};
