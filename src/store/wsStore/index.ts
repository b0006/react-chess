import { action, makeAutoObservable, observable } from 'mobx';
import { WS } from './types';

export class WsStore {
  public ws: WS | null = null;

  constructor() {
    makeAutoObservable(this, {
      ws: observable,
      initConnection: action,
    });
  }

  public initConnection = (socket: WS) => {
    this.ws = socket;
  };
}

export default new WsStore();
