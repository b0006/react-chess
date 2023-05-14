import React from 'react';
import cn from 'classnames';
import styles from './Radio.module.scss';
import { RadioProps } from './types';

export const Radio = React.forwardRef(
  (props: RadioProps, ref?: React.LegacyRef<HTMLInputElement>) => {
    const { label, className, disabled, wrapperStyle, ...rest } = props;

    return (
      <label
        style={wrapperStyle}
        className={cn(styles.wrapper, className, {
          [styles.wrapper_disabled]: disabled,
        })}
      >
        <input disabled={disabled} ref={ref} type='radio' className={styles.input} {...rest} />
        <span
          className={cn(styles.label, {
            [styles['label_no-text']]: !label,
          })}
        >
          {label}
        </span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
