import { FC, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { offlineGameStore } from '../../store';
import { Button, ModalLayout, Switcher, Select } from '../common';
import { ColorItem, DificultItem, AutoPromotionItem, FormFields } from './types';
import styles from './GameOfflineSettings.module.scss';

const PROMOTION_PIECE: AutoPromotionItem[] = [
  { label: 'Queen', value: 'q' },
  { label: 'Bishop', value: 'b' },
  { label: 'Knight', value: 'n' },
  { label: 'Rook', value: 'r' },
];

const AI_DIFFICULT: DificultItem[] = [
  { label: '800 (Easy)', value: 1 },
  { label: '1000', value: 3 },
  { label: '1200', value: 5 },
  { label: '1400', value: 7 },
  { label: '1600', value: 9 },
  { label: '1800', value: 11 },
  { label: '2000', value: 13 },
  { label: '2200 (Hard)', value: 15 },
];

const COLOR_LIST: ColorItem[] = [
  { label: 'White', value: 'w' },
  { label: 'Black', value: 'b' },
];

export const GameOfflineSettings: FC = observer(() => {
  const { startGame } = offlineGameStore;
  const navigate = useNavigate();

  const [isShownModal, setIsShownModal] = useState(false);

  const { watch, register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      isAudioOn: false,
      isConfirmSteps: false,
      isAutoPromotion: false,
      autopromotionPiece: 'q',
      difficult: AI_DIFFICULT[0].value,
      myColor: COLOR_LIST[0].value,
      isColoredMoves: true,
    },
  });

  const isAutoPromotionValue = watch('isAutoPromotion');

  const onSubmit = (data: FormFields): void => {
    startGame(data);
    navigate('/offline-chess-game');
  };

  return (
    <>
      <Button
        classNameLink={styles.link}
        className={styles.button}
        icon='desktop'
        text='Player VS AI'
        theme='primary'
        onClick={() => setIsShownModal(true)}
      />
      {isShownModal && (
        <ModalLayout
          overlayClickClose
          classNameInner={styles['modal-inner']}
          onClose={() => setIsShownModal(false)}
        >
          <h3 className={styles.title}>Game settings</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <Controller
                control={control}
                name='difficult'
                render={({ field: { onChange, value } }) => (
                  <Select
                    label='Difficult'
                    options={AI_DIFFICULT}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
            <div className={styles.field}>
              <Controller
                control={control}
                name='myColor'
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
            <Button type='submit' text='Start game' theme='primary' />
          </form>
        </ModalLayout>
      )}
    </>
  );
});
