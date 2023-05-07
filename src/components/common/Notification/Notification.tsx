import { FC } from 'react';
import { NotificationProvider } from './NotificationContext/NotificationContext';
import { Provider as InnerProvider } from './NotificationContext/NotificationProvider';
import { NotificationProps } from './types';

export const Provider: FC<NotificationProps> = ({ children, portalTargetSelector }) => (
  <NotificationProvider>
    <InnerProvider portalTargetSelector={portalTargetSelector}>{children}</InnerProvider>
  </NotificationProvider>
);
