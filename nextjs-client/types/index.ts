export interface LoginState {
  email: string;
  password: string;
}

export interface RegisterState extends LoginState {
  username: string;
  passwordConfirm: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
