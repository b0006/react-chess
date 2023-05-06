import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import { ClientOnlyPortal } from './ClientOnlyPortal';
import styles from './ModalLayout.module.scss';
import { ModalLayoutProps } from './types';

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  portalTargetSelector,
  overlayClickClose,
  children,
  isVisible,
  showCloseButton = true,
  classNameOverlay,
  classNameContent,
  classNameInner,
  onClose,
}) => {
  const [needClose, setNeedClose] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const [innerIsVisible, setInnerIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setInnerIsVisible(true);
    }

    if (innerIsVisible && !isVisible) {
      setNeedClose(true);
    }
  }, [innerIsVisible, isVisible]);

  if (!innerIsVisible) {
    return null;
  }

  const onNeedClose = (): void => {
    setNeedClose(true);
  };

  const onCloseEnd = (): void => {
    if (needClose) {
      onClose();
      setNeedClose(false);
      setInnerIsVisible(false);
    }
  };

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
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
        onKeyPress={onOverlayClick}
        onAnimationEnd={onCloseEnd}
      >
        <div
          ref={innerRef}
          className={cn(styles.inner, classNameInner, {
            [styles.inner_hide]: needClose,
          })}
        >
          <div className={cn(styles.content, classNameContent)}>
            {showCloseButton && (
              <button className={styles['button-close']} type='button' onClick={onNeedClose}>
                {/* <SvgIcon kind="cross" className={styles.icon} /> */}X
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};
