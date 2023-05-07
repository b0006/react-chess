import { FC } from 'react';
import { DIGIT_LIST } from '../constants';
import { VerticalSymbolsProps } from './types';
import styles from './VerticalSymbols.module.scss';

export const VerticalSymbols: FC<VerticalSymbolsProps> = ({ isRotate }) => {
  const viewList = isRotate ? [...DIGIT_LIST].reverse() : DIGIT_LIST;

  return (
    <div className={styles.verticalPanel}>
      {viewList.map((sym) => (
        <div className={styles.digitSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
