import { forwardRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { SvgIcon } from '../SvgIcon';
import styles from './Button.module.scss';
import { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      className,
      classNameLink,
      disabled,
      isLoading,
      isCircle,
      icon,
      iconSide = 'left',
      theme = 'primary',
      type = 'button',
      href,
      ...rest
    },
    ref,
  ) => {
    if (typeof icon === 'undefined' && typeof text === 'undefined') {
      return null;
    }

    const iconLeftSide = iconSide === 'left';
    const iconRightSide = iconSide === 'right';

    const classesIcon = cn(styles.icon, {
      [styles.icon_left]: iconLeftSide && text,
      [styles.icon_right]: iconRightSide && text,
      [styles.icon_only]: isCircle,
      [styles.icon_loading]: isLoading,
    });

    const svgIconLoader = <SvgIcon className={classesIcon} kind='loader' />;
    const svgIcon = icon && <SvgIcon kind={icon} className={classesIcon} />;

    const currentIcon = isLoading ? svgIconLoader : svgIcon;

    const button = (
      <button
        className={cn(styles.button, className, styles[`button_${theme}`], {
          [styles.button_circle]: isCircle,
        })}
        type={type}
        disabled={isLoading || disabled}
        ref={ref}
        {...rest}
      >
        {isCircle ? (
          svgIcon
        ) : (
          <>
            {iconLeftSide && currentIcon}
            {text && <span>{text}</span>}
            {iconRightSide && currentIcon}
          </>
        )}
      </button>
    );

    return href ? (
      <Link to={href} className={cn(styles.link, classNameLink)}>
        {button}
      </Link>
    ) : (
      button
    );
  },
);

Button.displayName = 'Button';
