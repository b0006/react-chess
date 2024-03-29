import { ChessGameOver } from '../../../store/partyStore/types';
import { ChessboardProps } from '../types';

export type UseGameOverProps = Pick<ChessboardProps, 'chessEngine' | 'boardState'>;

export type GameOverTypes = Record<ChessGameOver, boolean>;

export interface GameOverState {
  label: string;
  typeLabel: ChessGameOver | null;
  isOnceOver: boolean;
  typeData: GameOverTypes;
}
