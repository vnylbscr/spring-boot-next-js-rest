export interface LoginState {
  username: string;
  password: string;
}

export interface RegisterState extends LoginState {
  email: string;
  passwordConfirm: string;
}
