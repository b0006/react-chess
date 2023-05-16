import { Socket } from 'socket.io-client';

export interface WSMessage {
  type: string;
  data?: string;
}

export interface DefaultEventsMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [event: string]: (...args: any[]) => void;
}

export type WS = Socket<DefaultEventsMap, DefaultEventsMap>;
