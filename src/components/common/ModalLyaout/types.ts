import { ReactNode } from 'react';

export interface ClientOnlyPortalProps {
  selector?: string;
  children?: ReactNode | ReactNode[];
}

export interface ModalLayoutProps {
  isVisible: boolean;
  portalTargetSelector?: string;
  overlayClickClose?: boolean;
  showCloseButton?: boolean;
  classNameOverlay?: string;
  classNameInner?: string;
  classNameContent?: string;
  children?: ReactNode | ReactNode[];
  onClose: () => void;
}
