import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Scrollbar.module.scss';
import { ScrollbarProps } from './types';

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn(styles.scrollbar, className)}>
      {children}
    </div>
  ),
);

Scrollbar.displayName = 'Scrollbar';
