import { FC } from 'react';
import styles from './HorizontalSymbols.module.scss';

export const HorizontalSymbols: FC = () => {
  return (
    <div className={styles.horizontalPanel}>
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((sym) => (
        <div className={styles.alphabetSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
