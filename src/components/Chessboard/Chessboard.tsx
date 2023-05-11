import { forwardRef } from 'react';
import { ChessboardProps, OnMoveProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';
import { PromotionModal } from './PromotionModal';
import { StatusBar } from './StatusBar';
import { INIT_GAME_OVER_STATE } from './hooks/useGameOver.hook';

export const Chessboard = forwardRef<HTMLDivElement, ChessboardProps>(
  (
    {
      boardState,
      chessEngine,
      promotionState,
      isEnemyMoving,
      gameOverState = INIT_GAME_OVER_STATE,
      myColor,
      setPromotionState,
      onMove,
    },
    ref,
  ) => {
    const isRotate = myColor === 'b';
    const isMoveDisabled = isEnemyMoving || gameOverState.isOnceOver;

    const innerOnMove = (options: OnMoveProps) => {
      if (isMoveDisabled) {
        return;
      }

      onMove(options);
    };

    if (!boardState) {
      return <div>Chessboard error</div>;
    }

    return (
      <>
        <StatusBar
          isEnemyMoving={isEnemyMoving}
          chessEngine={chessEngine}
          gameOverText={gameOverState.label}
        />
        <div ref={ref} className={styles.chessboard}>
          <div className={styles.inner}>
            <HorizontalSymbols isRotate={isRotate} />
            <div className={styles.game}>
              <VerticalSymbols isRotate={isRotate} />
              <CellTable
                isEnemyMoving={isMoveDisabled}
                boardState={boardState}
                chessEngine={chessEngine}
                isRotate={isRotate}
                onMove={innerOnMove}
              />
              <VerticalSymbols isRotate={isRotate} />
            </div>
            <HorizontalSymbols isRotate={isRotate} />
          </div>
        </div>
        {promotionState.isShownModal && (
          <PromotionModal
            promotionState={promotionState}
            setPromotionState={setPromotionState}
            onMove={innerOnMove}
          />
        )}
      </>
    );
  },
);

Chessboard.displayName = 'Chessboard';
