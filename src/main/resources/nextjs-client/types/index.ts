export interface LoginState {
  email: string;
  password: string;
}

export interface RegisterState extends LoginState {
  username: string;
  passwordConfirm: string;
}
