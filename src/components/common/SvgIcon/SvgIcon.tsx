import React from 'react';
import cn from 'classnames';
import styles from './SvgIcon.module.scss';
import { SvgIconProps } from './types';
import { ICON_LIST } from './icons';

const SvgIcon: React.FC<SvgIconProps> = ({ kind, className, ...rest }) => {
  if (!kind) {
    return null;
  }

  const Icon = ICON_LIST[kind];
  return <Icon className={cn(className, styles.icon)} {...rest} />;
};

export { SvgIcon };
