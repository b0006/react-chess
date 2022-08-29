import { FC, useEffect, useState } from 'react';
import { ChessboardProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';

export const Chessboard: FC<ChessboardProps> = ({ boardState }) => {
  return (
    <div className={styles.chessboard}>
      <div className={styles.inner}>
        <HorizontalSymbols />
        <div className={styles.game}>
          <VerticalSymbols />
          <CellTable boardState={boardState} />
          <VerticalSymbols />
        </div>
        <HorizontalSymbols />
      </div>
    </div>
  );
};
