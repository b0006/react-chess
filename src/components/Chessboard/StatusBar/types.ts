import { ChessboardProps } from '../types';

export type StatusBarProps = Pick<ChessboardProps, 'isEnemyMoving' | 'chessEngine'>;
