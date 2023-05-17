import { action, makeAutoObservable, observable } from 'mobx';
import { io } from 'socket.io-client';

import { HTTP } from '../../agent/axios';
import { requests } from '../../agent';
import { ProfileData, UserData, WS, WSMessage } from './types';

const TOKEN_KEY = 'user-token-chess';
const WS_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const removeHeaderToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  HTTP.defaults.headers['Authorization'] = '';
};

const setHeaderToken = (token: string) => {
  HTTP.defaults.headers['Authorization'] = `Bearer ${token}`;
};

const initUser: UserData = {
  isAuth: false,
  profileData: null,
};

export class ProfileStore {
  public token = '';
  public isInitLoading = true;
  public userData: UserData = initUser;
  public ws: WS | null = null;

  private listenListData: Record<string, boolean> = {};

  constructor() {
    makeAutoObservable(this, {
      token: observable,
      isInitLoading: observable,
      userData: observable,
      ws: observable,
      setProfileData: action,
      signInAsGuest: action,
      logout: action,
      initWsConnection: action,
      listenWsMsg: action,
      wsDisconnect: action,
    });

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      this.token = token;
      setHeaderToken(token);

      requests
        .GET<ProfileData>('/auth/profile')
        .then((response) => {
          this.setProfileData(response.data);
        })
        .catch((err) => err)
        .finally(() => {
          this.isInitLoading = false;
        });
    } else {
      this.isInitLoading = false;
    }
  }

  public setProfileData = (data: ProfileData, token?: string) => {
    if (token) {
      this.token = token;
      localStorage.setItem(TOKEN_KEY, token);
      setHeaderToken(token);
    }

    this.userData = {
      ...this.userData,
      isAuth: true,
      profileData: data,
    };
  };

  public signInAsGuest = () => {
    this.userData = {
      ...this.userData,
      isAuth: true,
    };
  };

  public logout = () => {
    this.token = '';
    removeHeaderToken();
    this.userData = initUser;
  };

  public initWsConnection = (url = WS_URL, transport = 'websocket') => {
    const token = this.token;

    if (this.ws?.active) {
      return;
    }

    this.ws = io(url, {
      withCredentials: true,
      transports: [transport],
      auth: { token },
    });
  };

  public sendWsMsg = (event: string, message: WSMessage) => {
    this.ws?.emit(event, JSON.stringify(message));
  };

  public listenWsMsg = (event: string, callback: (message: WSMessage) => void) => {
    if (this.listenListData[event]) {
      return;
    }

    this.ws?.on(event, callback);
    this.listenListData[event] = true;
  };

  public wsDisconnect = () => {
    this.ws?.disconnect();
    this.ws = null;
    this.listenListData = {};
  };
}

export default new ProfileStore();
