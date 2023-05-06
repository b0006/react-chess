import React, { useState, useRef } from 'react';
import cn from 'classnames';

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
  const innerRef = useRef<HTMLDivElement>(null);

  const onNeedClose = (): void => {
    setNeedClose(true);
  };

  const onCloseEnd = (): void => {
    if (needClose) {
      console.log('onClose');
      onClose();
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
      console.log('overlay');
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
          ref={innerRef}
          className={cn(styles.inner, classNameInner, {
            [styles.inner_hide]: needClose,
          })}
        >
          <div className={cn(styles.content, classNameContent)}>
            {showCloseButton && (
              <button className={styles['button-close']} type='button' onClick={onNeedClose}>
                X
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};
