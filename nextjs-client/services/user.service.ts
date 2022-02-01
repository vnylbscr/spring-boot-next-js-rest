import axios from "axios";
import { END_POINT } from "@lib/constants";
import { LoginState, RegisterState } from "types";
import { useMutation } from "react-query";

type RegisterParams = Omit<RegisterState, "passwordConfirm">;

const login = async (data: LoginState) => {
  return await axios.post(`${END_POINT}/auth/login`, {
    ...data,
  });
};

const register = async ({ email, username, password }: RegisterParams) => {
  return axios.post(`${END_POINT}/auth/register`, {
    email,
    username,
    password,
  });
};

const useLoginMutation = () => {
  return useMutation((data: LoginState) => {
    return login(data);
  });
};

const useRegisterMutation = () => {
  return useMutation((data: RegisterParams) => {
    return register(data);
  });
};

export { useLoginMutation, useRegisterMutation };
