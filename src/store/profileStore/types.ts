import { Socket } from 'socket.io-client';

export interface WSMessage {
  data?: string;
}

export interface DefaultEventsMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [event: string]: (...args: any[]) => void;
}

export type WS = Socket<DefaultEventsMap, DefaultEventsMap>;

export interface ProfileData {
  id: string;
  username: string;
  email: string;
}

export interface UserData {
  isAuth: boolean;
  profileData: ProfileData | null;
}
