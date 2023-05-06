import React, { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { SvgIcon } from '../SvgIcon';
import { ClientOnlyPortal } from './ClientOnlyPortal';
import styles from './ModalLayout.module.scss';
import { ModalLayoutProps } from './types';

// TODO: bugfix - any times close animation not working
export const ModalLayout: React.FC<ModalLayoutProps> = ({
  portalTargetSelector,
  overlayClickClose,
  children,
  showCloseButton = true,
  classNameOverlay,
  classNameContent,
  classNameInner,
  onClose,
}) => {
  const [needClose, setNeedClose] = useState(false);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const elRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      innerRef.current = node;
      innerRef.current.focus();
    }
  }, []);

  const onNeedClose = () => {
    setNeedClose(true);
  };

  const onCloseEnd = () => {
    needClose && onClose();
  };

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const innerEl = innerRef.current;

    if (innerEl && event.target instanceof Element && innerEl.contains(event.target)) {
      return;
    }

    if (overlayClickClose) {
      onNeedClose();
    }
  };

  return (
    <ClientOnlyPortal selector={portalTargetSelector}>
      <div
        className={cn(styles.overlay, classNameOverlay, {
          [styles.overlay_hide]: needClose,
        })}
        tabIndex={0}
        role='button'
        onClick={onOverlayClick}
        onKeyDown={onOverlayClick}
        onTransitionEnd={onCloseEnd}
      >
        <div
          ref={elRef}
          tabIndex={0}
          className={cn(styles.inner, classNameInner, {
            [styles.inner_hide]: needClose,
          })}
        >
          <div className={cn(styles.content, classNameContent)}>
            {showCloseButton && (
              <button className={styles['button-close']} type='button' onClick={onNeedClose}>
                <SvgIcon kind='cross' className={styles.icon} />
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};
