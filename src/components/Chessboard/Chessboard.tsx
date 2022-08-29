import { FC, useEffect } from 'react';
import { ChessboardProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';

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
            <div className={styles.board}>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
              </div>
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
                <div className={`${styles.cell} ${styles.cell__dark}`} />
                <div className={`${styles.cell} ${styles.cell__light}`} />
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
