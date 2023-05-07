import { ChessInstance } from 'chess.js';
import { GameData } from '../../store/offlineGame/types';
import { UseChessboardReturn } from '../Chessboard';

export interface UseAiEngineProps extends Pick<UseChessboardReturn, 'onMove'> {
  chessEngine: ChessInstance;
  game: GameData;
}
