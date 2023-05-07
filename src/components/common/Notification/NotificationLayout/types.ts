import { ReactNode } from 'react';
import { Placement } from '../types';

export interface NotificationLayoutProps {
  placement?: Placement;
  children?: ReactNode | ReactNode[];
}
