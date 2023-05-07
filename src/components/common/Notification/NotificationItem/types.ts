import { Content, Options } from '../types';

export interface NotificationItemProps extends Content, Options {
  needClose?: boolean;
}
