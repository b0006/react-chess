import { FC, useEffect } from 'react';
import { ChessboardProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';

export const Chessboard: FC<ChessboardProps> = ({ lastMove }) => {
  useEffect(() => {
    if (lastMove) {
      console.log(lastMove);
    }
  }, [lastMove]);

  return (
    <div>
      <div className={styles.chessboard}>
        <div className={styles.inner}>
          <HorizontalSymbols />
          <div className={styles.game}>
            <VerticalSymbols />
            <CellTable />
            <VerticalSymbols />
          </div>
          <HorizontalSymbols />
        </div>
      </div>
    </div>
  );
};
