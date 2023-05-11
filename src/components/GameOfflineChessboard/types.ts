import { ChessInstance } from 'chess.js';
import { ChessParty } from '../../store/partyStore/types';
import { UseChessboardReturn } from '../Chessboard';

export interface UseAiEngineProps extends Pick<UseChessboardReturn, 'onMove'> {
  chessEngine: ChessInstance;
  viewParty: ChessParty;
}

export interface UseApiHistory {
  viewParty: ChessParty;
}
