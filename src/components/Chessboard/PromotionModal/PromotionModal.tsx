import { PieceColor } from 'chess.js';
import { FC } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import { ICONS_DEFAULT } from '../icons';
import { PromotionPiece } from '../types';
import { PromotionModalProps } from './types';
import styles from './PromotionModal.module.scss';

const PROMOTION_PIECE: PromotionPiece[] = ['b', 'n', 'q', 'r'];

export const PromotionModal: FC<PromotionModalProps> = ({
  promotionState,
  setPromotionState,
  onMove,
}) => {
  const color: PieceColor = promotionState.move?.color || 'w';

  const onPromotionPieceClick = (piece: PromotionPiece) => () => {
    onMove({ move: promotionState.move, extendPromotion: piece });
    setPromotionState({ isShownModal: false, move: null });
  };

  return (
    <ModalLayout
      showCloseButton={false}
      onClose={() => setPromotionState({ isShownModal: false, move: null })}
    >
      <h2 className={styles.title}>Choose a chess piece</h2>
      <div className={styles['piece-wrapper']}>
        {PROMOTION_PIECE.map((pieceType) => {
          const PieceIcon = ICONS_DEFAULT[color][pieceType];

          return (
            <button
              key={pieceType}
              type='button'
              className={styles['piece-button']}
              onClick={onPromotionPieceClick(pieceType)}
            >
              <PieceIcon className={styles['piece-icon']} />
            </button>
          );
        })}
      </div>
    </ModalLayout>
  );
};
