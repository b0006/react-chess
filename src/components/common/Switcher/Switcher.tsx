import { forwardRef, LegacyRef } from 'react';
import cn from 'classnames';
import styles from './Switcher.module.scss';
import { SwitcherProps } from './types';

export const Switcher = forwardRef((props: SwitcherProps, ref?: LegacyRef<HTMLInputElement>) => {
  const { className, ...rest } = props;
  return (
    <label className={cn(styles.switch, className)}>
      <input ref={ref} className={styles.input} type='checkbox' {...rest} />
      <span className={styles.slider} />
    </label>
  );
});

Switcher.displayName = 'Switcher';
