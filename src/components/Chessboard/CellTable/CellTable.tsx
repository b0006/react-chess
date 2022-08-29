import { FC } from 'react';
import styles from './CellTable.module.scss';
import { DIGIT_LIST, SYMBOL_LIST } from '../constants';

export const CellTable: FC = () => {
  return (
    <div className={styles.board}>
      {SYMBOL_LIST.map((sym, symIndex) => (
        <div key={sym} className={styles.row}>
          {DIGIT_LIST.map((digit, digitIndex) => (
            <div
              key={`${sym}_${digit}`}
              className={`${styles.cell} ${
                (symIndex + digitIndex) % 2 === 0 ? styles.cell__light : styles.cell__dark
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
