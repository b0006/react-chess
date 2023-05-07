import { PieceColor } from 'chess.js';
import { PromotionPiece } from '../../components/Chessboard';

export interface GameData {
  isPlaying: boolean;
  isAutoPromotion: boolean;
  autopromotionPiece: PromotionPiece;
  isColoredMoves: boolean;
  isConfirmSteps: boolean;
  isAudioOn: boolean;
  difficult: number;
  myColor: PieceColor;
}
