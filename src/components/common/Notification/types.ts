import { ReactNode } from 'react';

export type Appearance = 'info' | 'error' | 'success' | 'warning';

export type Placement =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export interface Content {
  title: string;
  description: string;
  showCloseButton?: boolean;
}

export interface Options {
  id?: string;
  placement?: Placement;
  appearance?: Appearance;
}

export interface NotificationProps {
  portalTargetSelector?: string;
  children?: ReactNode | ReactNode[];
}
