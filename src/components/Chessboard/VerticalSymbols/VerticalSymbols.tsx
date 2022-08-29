import { FC } from 'react';
import { DIGIT_LIST } from '../constants';
import styles from './VerticalSymbols.module.scss';

export const VerticalSymbols: FC = () => {
  return (
    <div className={styles.verticalPanel}>
      {DIGIT_LIST.map((sym) => (
        <div className={styles.digitSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
