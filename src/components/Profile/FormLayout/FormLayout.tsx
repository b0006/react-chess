import { FC } from 'react';
import cn from 'classnames';
import styles from './FormLayout.module.scss';
import { Button, useNotification } from '../../common';
import { FormLayoutProps } from './types';

export const FormLayout: FC<FormLayoutProps> = ({ isLoading, children }) => {
  const { addNotification } = useNotification();

  const onProviderClick = () => {
    addNotification(
      { title: 'Service is not ready', description: '' },
      { id: 'provider', appearance: 'info' },
    );
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles['wrapper_loading']]: isLoading,
      })}
    >
      <div className={styles.form}>{children}</div>
      <div className={styles.or}>or</div>
      <Button
        onClick={onProviderClick}
        className={styles.button}
        theme='secondary'
        text='Via Google'
        icon='google'
      />
      <Button
        onClick={onProviderClick}
        className={styles.button}
        theme='secondary'
        text='Via VK'
        icon='vk'
      />
    </div>
  );
};
