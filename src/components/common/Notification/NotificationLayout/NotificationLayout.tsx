import { FC } from 'react';
import cn from 'classnames';
import styles from './NotificationLayout.module.scss';
import { NotificationLayoutProps } from './types';

export const NotificationLayout: FC<NotificationLayoutProps> = ({
  placement = 'top-right',
  children,
}) => {
  return <div className={cn(styles.layout, styles[placement])}>{children}</div>;
};
