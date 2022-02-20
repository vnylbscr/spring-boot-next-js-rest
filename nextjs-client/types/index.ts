export type ReturnAwait<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T;

export type Await<T> = T extends Promise<infer U> ? U : T;

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
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface CreateNote {
  title: string;
  text: string;
  userId: string;
}

export type ResObject<T> = {
  data: T;
  status: number;
  message: string;
};

export interface LoginResponse {
  token: string;
  user: User;
}

export type RegisterParams = Omit<RegisterState, "passwordConfirm">;
