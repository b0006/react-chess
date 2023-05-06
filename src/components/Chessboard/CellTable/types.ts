import { ChessboardProps } from '../types';

export type CellTableProps = Pick<ChessboardProps, 'onMove' | 'boardState' | 'chessEngine'>;
