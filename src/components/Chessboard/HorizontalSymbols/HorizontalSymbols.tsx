import { FC } from 'react';
import { SYMBOL_LIST } from '../constants';
import styles from './HorizontalSymbols.module.scss';
import { HorizontalSymbolsProps } from './types';

export const HorizontalSymbols: FC<HorizontalSymbolsProps> = ({ isRotate }) => {
  const viewList = isRotate ? [...SYMBOL_LIST].reverse() : SYMBOL_LIST;

  return (
    <div className={styles.horizontalPanel}>
      {viewList.map((sym) => (
        <div className={styles.alphabetSymbol} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};
