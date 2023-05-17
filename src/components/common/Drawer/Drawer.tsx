import { FC } from 'react';
import { ClientOnlyPortal } from '../ModalLayout/ClientOnlyPortal';
import { DrawerProps } from './types';

export const Drawer: FC<DrawerProps> = ({ portalTargetSelector, children }) => {
  return (
    <ClientOnlyPortal selector={portalTargetSelector}>
      <div>{children}</div>
    </ClientOnlyPortal>
  );
};
