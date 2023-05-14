import { FC } from 'react';
import { ClientOnlyPortal } from '../ModalLyaout/ClientOnlyPortal';
import { DrawerProps } from './types';

export const Drawer: FC<DrawerProps> = ({ portalTargetSelector, children }) => {
  return (
    <ClientOnlyPortal selector={portalTargetSelector}>
      <div>{children}</div>
    </ClientOnlyPortal>
  );
};
