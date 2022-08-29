import { FC } from 'react';
import { SYMBOL_LIST } from '../constants';
import styles from './HorizontalSymbols.module.scss';

export const HorizontalSymbols: FC = () => {
  return (
    <div className={styles.horizontalPanel}>
      {SYMBOL_LIST.map((sym) => (
        <div className={styles.alphabetSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
