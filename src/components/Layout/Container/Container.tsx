import { forwardRef, LegacyRef } from 'react';
import cn from 'classnames';
import styles from './Container.module.scss';
import { ContainerProps } from './types';

const Container = forwardRef(
  ({ children, className, as = 'div', ...rest }: ContainerProps, ref: LegacyRef<never>) => {
    const Tag = as;
    return (
      <Tag {...rest} className={cn(className, styles.container)} ref={ref}>
        {children}
      </Tag>
    );
  },
);

Container.displayName = 'Container';

export { Container };
