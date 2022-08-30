import { ChessboardProps } from '../types';

export type CellTableProps = Pick<ChessboardProps, 'onClickCell' | 'boardState' | 'chessEngine'>;
