import { ChessboardProps } from '../types';

export type PromotionModalProps = Pick<
  ChessboardProps,
  'promotionState' | 'setPromotionState' | 'onMove'
>;
