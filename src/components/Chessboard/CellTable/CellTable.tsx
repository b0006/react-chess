import { FC, useState, useEffect } from 'react';
import { Move } from 'chess.js';
import cn from 'classnames';
import styles from './CellTable.module.scss';
import { DIGIT_LIST, SYMBOL_LIST } from '../constants';
import { ICONS_DEFAULT } from '../icons';
import { CellTableProps } from './types';
import { BoardCell } from '../types';

export const CellTable: FC<CellTableProps> = ({ chessEngine, boardState, onClickCell }) => {
  const [posibleMoves, setPosibleMoves] = useState<Record<string, Move>>({});

  // clear posible moves after board state updated
  useEffect(() => {
    if (boardState) {
      setPosibleMoves({});
    }
  }, [boardState]);

  const onClickCellInner = (squareId: string, cellItem?: BoardCell) => () => {
    const moveList = chessEngine.moves({ square: squareId, verbose: true }) || [];
    const movesData = moveList.reduce(
      (result, move) => ({
        ...result,
        [move.to]: move,
      }),
      {} as Record<string, Move>,
    );

    setPosibleMoves((prevMoveData) => {
      let nextMove: Move | null = null;

      if (!cellItem && !prevMoveData[squareId]) {
        onClickCell?.(squareId, nextMove);
        return {};
      }

      if (prevMoveData[squareId]) {
        nextMove = prevMoveData[squareId];
      }

      onClickCell?.(squareId, nextMove);
      return movesData;
    });
  };

  return (
    <div className={styles.board}>
      {DIGIT_LIST.map((digit, digitIndex) => (
        <div key={digit} className={styles.row}>
          {SYMBOL_LIST.map((sym, symIndex) => {
            const squareId = `${sym}${digit}`;
            const cellItem: BoardCell | undefined = boardState?.[digitIndex]?.[symIndex];
            const Icon = cellItem ? ICONS_DEFAULT?.[cellItem.color]?.[cellItem.type] : null;

            const isLightCell = (symIndex + digitIndex) % 2 === 0;

            return (
              <div
                key={squareId}
                tabIndex={0}
                role='button'
                onKeyDown={onClickCellInner(squareId, cellItem)}
                onClick={onClickCellInner(squareId, cellItem)}
                data-square={squareId}
                className={cn(styles.cell, {
                  [styles.cell__light]: isLightCell,
                  [styles.cell__dark]: !isLightCell,
                  [styles.cell__move]: posibleMoves[squareId],
                })}
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
