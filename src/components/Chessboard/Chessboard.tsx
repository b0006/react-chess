import { forwardRef } from 'react';
import { ChessboardProps } from './types';
import styles from './Chessboard.module.scss';
import { HorizontalSymbols } from './HorizontalSymbols';
import { VerticalSymbols } from './VerticalSymbols';
import { CellTable } from './CellTable';
import { PromotionModal } from './PromotionModal';

export const Chessboard = forwardRef<HTMLDivElement, ChessboardProps>(
  ({ boardState, chessEngine, promotionState, setPromotionState, onMove }, ref) => {
    return (
      <>
        <div ref={ref} className={styles.chessboard}>
          <div className={styles.inner}>
            <HorizontalSymbols />
            <div className={styles.game}>
              <VerticalSymbols />
              <CellTable boardState={boardState} chessEngine={chessEngine} onMove={onMove} />
              <VerticalSymbols />
            </div>
            <HorizontalSymbols />
          </div>
        </div>
        {promotionState.isShownModal && (
          <PromotionModal
            promotionState={promotionState}
            setPromotionState={setPromotionState}
            onMove={onMove}
          />
        )}
      </>
    );
  },
);

Chessboard.displayName = 'Chessboard';
