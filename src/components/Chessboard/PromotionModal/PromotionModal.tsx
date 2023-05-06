import { FC } from 'react';
import { Button } from '../../common/Button';
import { ModalLayout } from '../../common/ModalLyaout';
import { PromotionModalProps } from './types';

export const PromotionModal: FC<PromotionModalProps> = ({
  promotionState,
  setPromotionState,
  onMove,
}) => {
  return (
    <ModalLayout
      showCloseButton={false}
      onClose={() => setPromotionState({ isShownModal: false, move: null })}
    >
      <Button
        type='button'
        text='knight'
        onClick={() => {
          if (!promotionState.move) {
            return;
          }

          onMove(promotionState.move, 'n');
          setPromotionState({ isShownModal: false, move: null });
        }}
      />
      <Button
        type='button'
        text='bishop'
        onClick={() => {
          if (!promotionState.move) {
            return;
          }

          onMove(promotionState.move, 'b');
          setPromotionState({ isShownModal: false, move: null });
        }}
      />
    </ModalLayout>
  );
};
