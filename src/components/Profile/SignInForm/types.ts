import { ProfileData } from '../../../store/profileStore/types';

export interface FormFields {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  userData: ProfileData;
}
