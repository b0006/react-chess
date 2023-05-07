import { FC, KeyboardEvent, useState, useEffect, useRef } from 'react';
import { Move } from 'chess.js';
import cn from 'classnames';
import { useClickOutside } from '../../../hooks';
import { DIGIT_LIST, SYMBOL_LIST } from '../constants';
import { ICONS_DEFAULT } from '../icons';
import { BoardCell } from '../types';
import { CellTableProps } from './types';
import styles from './CellTable.module.scss';

export const CellTable: FC<CellTableProps> = ({
  chessEngine,
  boardState,
  isEnemyMoving,
  isRotate,
  onMove,
}) => {
  const boardElRef = useRef<HTMLDivElement>(null);

  const viewBoardState = isRotate
    ? [...boardState].reverse().map((row) => [...row].reverse())
    : boardState;

  const [posibleMoves, setPosibleMoves] = useState<Record<string, Move>>({});

  const resetPosibleMoves = () => setPosibleMoves({});

  useClickOutside(boardElRef, resetPosibleMoves);

  // clear posible moves after board state updated
  useEffect(() => {
    if (boardState) {
      resetPosibleMoves();
    }
  }, [boardState]);

  const onClickCellInner = (cellItem: BoardCell | null, squareId: string) => () => {
    if (isEnemyMoving) {
      return;
    }

    const moveList = chessEngine.moves({ square: squareId, verbose: true }) || [];
    const movesData = moveList.reduce(
      (result, move) => ({
        ...result,
        [move.to]: move,
      }),
      {} as Record<string, Move>,
    );

    if (!cellItem && !posibleMoves[squareId]) {
      setPosibleMoves({});
      return;
    }

    if (posibleMoves[squareId]) {
      onMove?.(posibleMoves[squareId]);
    }

    setPosibleMoves(movesData);
  };

  const onKeyDownCellInner =
    (cellItem: BoardCell | null, squareId: string) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (isEnemyMoving) {
        return;
      }

      switch (event.key) {
        // TODO: move by arrows
        case 'Enter':
          onClickCellInner(cellItem, squareId)();
          break;
        default:
          return;
      }
    };

  const viewDigitList = isRotate ? [...DIGIT_LIST].reverse() : DIGIT_LIST;
  const viewSymbolList = isRotate ? [...SYMBOL_LIST].reverse() : SYMBOL_LIST;

  return (
    <div className={styles.board} ref={boardElRef}>
      {viewDigitList.map((digit, digitIndex) => (
        <div key={digit} className={styles.row}>
          {viewSymbolList.map((sym, symIndex) => {
            const squareId = `${sym}${digit}`;
            const cellItem: BoardCell | null = viewBoardState?.[digitIndex]?.[symIndex] || null;
            const Icon = cellItem ? ICONS_DEFAULT?.[cellItem.color]?.[cellItem.type] : null;

            const isLightCell = (symIndex + digitIndex) % 2 === 0;

            return (
              <div
                key={squareId}
                tabIndex={0}
                role='button'
                onKeyDown={onKeyDownCellInner(cellItem, squareId)}
                onClick={onClickCellInner(cellItem, squareId)}
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
