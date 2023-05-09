export interface FormFields {
  email: string;
  password: string;
}

// TODO: replace at user mobx store
interface ProfileData {
  id: string;
  username: string;
  email: string;
}

export interface SignInResponse {
  accessToken: string;
  userData: ProfileData;
}
