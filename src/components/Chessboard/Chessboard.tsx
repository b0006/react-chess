import { forwardRef } from 'react';
import { Move } from 'chess.js';
import { ChessboardProps, PromotionPiece } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';
import { PromotionModal } from './PromotionModal';
import { StatusBar } from './StatusBar';

export const Chessboard = forwardRef<HTMLDivElement, ChessboardProps>(
  ({ boardState, chessEngine, promotionState, isEnemyMoving, setPromotionState, onMove }, ref) => {
    const innerOnMove = (move: Move | null, extendPromotion?: PromotionPiece) => {
      if (isEnemyMoving) {
        return;
      }

      onMove(move, extendPromotion);
    };

    return (
      <>
        <StatusBar isEnemyMoving={isEnemyMoving} chessEngine={chessEngine} />
        <div ref={ref} className={styles.chessboard}>
          <div className={styles.inner}>
            <HorizontalSymbols />
            <div className={styles.game}>
              <VerticalSymbols />
              <CellTable
                isEnemyMoving={isEnemyMoving}
                boardState={boardState}
                chessEngine={chessEngine}
                onMove={innerOnMove}
              />
              <VerticalSymbols />
            </div>
            <HorizontalSymbols />
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
