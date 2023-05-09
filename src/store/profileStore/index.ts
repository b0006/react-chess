import { action, makeAutoObservable, observable } from 'mobx';

import { HTTP } from '../../agent/axios';
import { requests } from '../../agent';
import { ProfileData, UserData } from './types';

const TOKEN_KEY = 'user-token-chess';

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

  constructor() {
    makeAutoObservable(this, {
      token: observable,
      isInitLoading: observable,
      userData: observable,
      setProfileData: action,
      signInAsGuest: action,
      logout: action,
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
}

export default new ProfileStore();
