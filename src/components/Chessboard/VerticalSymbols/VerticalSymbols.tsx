import { FC } from 'react';
import styles from './VerticalSymbols.module.scss';

export const VerticalSymbols: FC = () => {
  return (
    <div className={styles.verticalPanel}>
      {['1', '2', '3', '4', '5', '6', '7', '8'].map((sym) => (
        <div className={styles.digitSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
