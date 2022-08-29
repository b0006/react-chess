import { FC } from 'react';
import styles from './CellTable.module.scss';
import { DIGIT_LIST, SYMBOL_LIST } from '../constants';

export const CellTable: FC = () => {
  return (
    <div className={styles.board}>
      {DIGIT_LIST.map((digit, digitIndex) => (
        <div key={digit} className={styles.row}>
          {SYMBOL_LIST.map((sym, symIndex) => {
            const squareId = `${sym}${digit}`;

            return (
              <div
                key={squareId}
                data-square={squareId}
                className={`${styles.cell} ${
                  (symIndex + digitIndex) % 2 === 0 ? styles.cell__light : styles.cell__dark
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
