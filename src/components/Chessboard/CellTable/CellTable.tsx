import { FC } from 'react';
import styles from './CellTable.module.scss';
import { DIGIT_LIST, SYMBOL_LIST } from '../constants';
import { ICONS_DEFAULT } from '../icons';
import { CellTableProps } from './types';
import { BoardCell } from '../types';

export const CellTable: FC<CellTableProps> = ({ boardState, onClickCell }) => {
  return (
    <div className={styles.board}>
      {DIGIT_LIST.map((digit, digitIndex) => (
        <div key={digit} className={styles.row}>
          {SYMBOL_LIST.map((sym, symIndex) => {
            const squareId = `${sym}${digit}`;
            const cellItem: BoardCell | undefined = boardState?.[digitIndex]?.[symIndex];
            const Icon = cellItem ? ICONS_DEFAULT?.[cellItem.color]?.[cellItem.type] : null;

            return (
              <div
                key={squareId}
                tabIndex={0}
                role='button'
                onKeyDown={() => onClickCell?.(squareId, cellItem)}
                onClick={() => onClickCell?.(squareId, cellItem)}
                data-square={squareId}
                className={`${styles.cell} ${
                  (symIndex + digitIndex) % 2 === 0 ? styles.cell__light : styles.cell__dark
                }`}
              >
                {Icon && <Icon className={styles.icon} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
