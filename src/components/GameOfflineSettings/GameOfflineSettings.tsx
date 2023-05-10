import { FC } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { partyStore } from '../../store';
import { ChessParty } from '../../store/partyStore/types';
import { useFetchDataApi } from '../../hooks';
import { Button, ModalLayout, Switcher, Select, useNotification } from '../common';
import {
  ColorItem,
  DificultItem,
  AutoPromotionItem,
  FormFields,
  GameOfflineSettingsProps,
} from './types';
import styles from './GameOfflineSettings.module.scss';

const PROMOTION_PIECE: AutoPromotionItem[] = [
  { label: 'Queen', value: 'q' },
  { label: 'Bishop', value: 'b' },
  { label: 'Knight', value: 'n' },
  { label: 'Rook', value: 'r' },
];

const AI_DIFFICULT: DificultItem[] = [
  { label: '800 (Easy)', value: 800 },
  { label: '1000', value: 1000 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
  { label: '2000', value: 2000 },
  { label: '2200 (Hard)', value: 2200 },
];

const COLOR_LIST: ColorItem[] = [
  { label: 'White', value: 'w' },
  { label: 'Black', value: 'b' },
];

export const GameOfflineSettings: FC<GameOfflineSettingsProps> = observer(({ onClose }) => {
  const { addNotification } = useNotification();

  const [isLoading, createChessParty] = useFetchDataApi<FormFields, ChessParty>(
    '/api/chess',
    'POST',
  );

  const { startOfflineParty } = partyStore;
  const navigate = useNavigate();

  const { watch, register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      isAudioOn: false,
      isConfirmSteps: false,
      isAutoPromotion: false,
      autopromotionPiece: 'q',
      difficult: AI_DIFFICULT[0].value,
      colorCreater: COLOR_LIST[0].value,
      isColoredMoves: true,
    },
  });

  const isAutoPromotionValue = watch('isAutoPromotion');

  const onSubmit = async (data: FormFields) => {
    const { response, error } = await createChessParty({
      autopromotionPiece: data.autopromotionPiece,
      difficult: data.difficult,
      fen: null,
      pgn: null,
      isAudioOn: data.isAudioOn,
      isAutoPromotion: data.isAutoPromotion,
      isColoredMoves: data.isColoredMoves,
      isConfirmSteps: data.isConfirmSteps,
      colorCreater: data.colorCreater,
    });

    if (error || !response) {
      addNotification(
        { title: 'Error', description: error?.toString() || 'Unknown error' },
        { appearance: 'error' },
      );
      return;
    }

    startOfflineParty({
      ...response,
      myColor: data.colorCreater,
    });
    navigate('/offline-chess-game');
  };

  return (
    <ModalLayout overlayClickClose classNameInner={styles['modal-inner']} onClose={onClose}>
      <h3 className={styles.title}>Game settings</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Controller
            control={control}
            name='difficult'
            render={({ field: { onChange, value } }) => (
              <Select label='Difficult' options={AI_DIFFICULT} onChange={onChange} value={value} />
            )}
          />
        </div>
        <div className={styles.field}>
          <Controller
            control={control}
            name='colorCreater'
            render={({ field: { onChange, value } }) => (
              <Select label='My color' options={COLOR_LIST} onChange={onChange} value={value} />
            )}
          />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Autopromotion</span>
          <Switcher className={styles.switcher} {...register('isAutoPromotion')} />
        </div>
        {isAutoPromotionValue && (
          <div className={styles.field}>
            <Controller
              control={control}
              name='autopromotionPiece'
              render={({ field: { onChange, value } }) => (
                <Select
                  label='Autopromotion piece'
                  options={PROMOTION_PIECE}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        )}
        {/* <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Colored possible moves</span>
          <Switcher className={styles.switcher} {...register('isColoredMoves')} />
        </div> */}
        {/* <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Confirm move</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Sound on</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div> */}
        <Button type='submit' text='Start game' theme='primary' isLoading={isLoading} />
      </form>
    </ModalLayout>
  );
});
