import React from 'react';
import cn from 'classnames';
import { SvgIcon } from '../SvgIcon';
import styles from './Tag.module.scss';
import { TagProps } from './types';

export const Tag: React.FC<TagProps> = ({ className, text, theme = 'primary', onRemove }) => {
  const hasRemoveButton = typeof onRemove === 'function';

  const onClickCross = () => {
    onRemove?.();
  };

  return (
    <div className={cn(styles.tag, className, styles[`tag_${theme}`])}>
      <span className={styles.title}>{text}</span>
      {hasRemoveButton && (
        <button className={styles.button} type='button' onClick={onClickCross}>
          <SvgIcon className={styles.icon} kind='cross' />
        </button>
      )}
    </div>
  );
};
