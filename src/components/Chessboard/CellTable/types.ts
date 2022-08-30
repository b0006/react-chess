import { BoardState, ChessboardProps } from '../types';

export interface CellTableProps extends Pick<ChessboardProps, 'onClickCell'> {
  boardState: BoardState | null;
}
