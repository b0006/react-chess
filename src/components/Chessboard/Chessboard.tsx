import { FC, useEffect, useRef, useState } from 'react';
import { Chess, ShortMove } from 'chess.js';
import { ChessboardProps, UseChessboard } from './types';
import styles from './Chessboard.module.scss';

export const useChessboard = (): UseChessboard => {
  const chessRef = useRef(new Chess());
  const [lastMove, setLastMove] = useState<ShortMove | null>(null);

  return { chessRef, initBoardState: chessRef.current.board(), lastMove, setLastMove };
};

const HorizontalSymbols: FC = () => {
  return (
    <div className={styles['horizontal-panel']}>
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((sym) => (
        <div className={styles['alphabet-symbol']} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const VerticalSymbols: FC = () => {
  return (
    <div className={styles['vertical-panel']}>
      {['1', '2', '3', '4', '5', '6', '7', '8'].map((sym) => (
        <div className={styles['digit-symbol']} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export const Chessboard: FC<ChessboardProps> = ({ lastMove }) => {
  useEffect(() => {
    console.log(lastMove);
  }, [lastMove]);

  return (
    <div>
      <div className={styles.chessboard}>
        <div className={styles.inner}>
          <HorizontalSymbols />
          <div className={styles.game}>
            <VerticalSymbols />
            <div className={styles.board}>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
                <div className={`${styles.cell} ${styles['cell--dark']}`} />
                <div className={`${styles.cell} ${styles['cell--light']}`} />
              </div>
            </div>
            <VerticalSymbols />
          </div>
          <HorizontalSymbols />
        </div>
      </div>
    </div>
  );
};
