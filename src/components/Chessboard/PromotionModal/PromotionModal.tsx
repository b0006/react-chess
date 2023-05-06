import { FC } from 'react';
import { ModalLayout } from '../../common/ModalLyaout';
import { PromotionModalProps } from './types';

export const PromotionModal: FC<PromotionModalProps> = ({
  promotionState,
  setPromotionState,
  onMove,
}) => {
  return (
    <ModalLayout
      isVisible={promotionState.isShownModal}
      onClose={() => setPromotionState({ isShownModal: false, move: null })}
    >
      <button
        type='button'
        onClick={() => {
          if (!promotionState.move) {
            return;
          }

          onMove(promotionState.move, 'n');
          setPromotionState({ isShownModal: false, move: null });
        }}
      >
        knight
      </button>
      <button
        type='button'
        onClick={() => {
          if (!promotionState.move) {
            return;
          }

          onMove(promotionState.move, 'b');
          setPromotionState({ isShownModal: false, move: null });
        }}
      >
        bishop
      </button>
    </ModalLayout>
  );
};
