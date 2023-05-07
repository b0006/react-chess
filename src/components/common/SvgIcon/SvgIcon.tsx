import { FC } from 'react';
import cn from 'classnames';
import styles from './SvgIcon.module.scss';
import { SvgIconProps } from './types';
import { ICON_LIST } from './icons';

export const SvgIcon: FC<SvgIconProps> = ({ kind, className, ...rest }) => {
  if (!kind) {
    return null;
  }

  const Icon = ICON_LIST[kind];
  return <Icon className={cn(className, styles.icon)} {...rest} />;
};
