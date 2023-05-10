import { PieceColor } from 'chess.js';
import { PromotionPiece } from '../../components/Chessboard';

export type ChessGameOver =
  | 'checkmate'
  | 'draw'
  | 'insufficientMaterial'
  | 'stalemate'
  | 'threefoldRepetition';

export interface ChessParty {
  id: string;
  creater: string;
  whitePlayer: string | null;
  blackPlayer: string | null;
  winPlayer: string | null;
  fen: string | null;
  pgn: string | null;
  resultParty: ChessGameOver | null;
  isVersusAi: boolean;
  isPlaying: boolean;
  isAutoPromotion: boolean;
  autopromotionPiece: PromotionPiece;
  isColoredMoves: boolean;
  isConfirmSteps: boolean;
  isAudioOn: boolean;
  difficult: number;
  myColor: PieceColor;
  createdAt: string;
  updatedAt: string;
}

export interface OfflineStartParty
  extends Omit<
    ChessParty,
    | 'id'
    | 'resultParty'
    | 'winPlayer'
    | 'whitePlayer'
    | 'creater'
    | 'blackPlayer'
    | 'myColor'
    | 'createdAt'
    | 'updatedAt'
  > {
  colorCreater: PieceColor;
}
