import { LegacyRef, forwardRef } from 'react';
import cn from 'classnames';
import { SvgIcon } from '../SvgIcon';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './types';

export const Checkbox = forwardRef((props: CheckboxProps, ref?: LegacyRef<HTMLInputElement>) => {
  const { label, className, isError, disabled, ...rest } = props;

  return (
    <label
      className={cn(styles.wrapper, className, {
        [styles.wrapper_error]: isError && !disabled,
        [styles.wrapper_disabled]: disabled,
      })}
    >
      <input disabled={disabled} ref={ref} type='checkbox' className={styles.input} {...rest} />
      <div className={styles.checkmark}>
        <SvgIcon kind='checked' className={styles.icon} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
