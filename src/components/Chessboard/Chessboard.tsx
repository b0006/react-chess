import { forwardRef } from 'react';
import { ChessboardProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';

export const Chessboard = forwardRef<HTMLDivElement, ChessboardProps>(
  ({ boardState, onClickCell }, ref) => {
    return (
      <div ref={ref} className={styles.chessboard}>
        <div className={styles.inner}>
          <HorizontalSymbols />
          <div className={styles.game}>
            <VerticalSymbols />
            <CellTable boardState={boardState} onClickCell={onClickCell} />
            <VerticalSymbols />
          </div>
          <HorizontalSymbols />
        </div>
      </div>
    );
  },
);

Chessboard.displayName = 'Chessboard';
