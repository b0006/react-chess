import { BoardState, ChessboardProps } from '../types';

export interface CellTableProps
  extends Pick<ChessboardProps, 'onMove' | 'chessEngine' | 'isEnemyMoving'> {
  boardState: BoardState;
  isRotate: boolean;
}
