import { ChessboardProps } from '../types';

export interface StatusBarProps extends Pick<ChessboardProps, 'isEnemyMoving' | 'chessEngine'> {
  gameOverText: string;
}
