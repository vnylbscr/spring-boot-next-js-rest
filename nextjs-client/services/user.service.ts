import axios from "axios";
import { END_POINT, isServer } from "@lib/constants";
import { LoginState, Note, RegisterState, User } from "types";
import { useMutation, useQuery } from "react-query";
import customRequest from "./request";
import Router from "next/router";
import { useEffect, useState } from "react";

type RegisterParams = Omit<RegisterState, "passwordConfirm">;

const login = async (data: LoginState) => {
  return await axios.post(
    `${END_POINT}/auth/login`,
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );
};

const register = async ({ email, username, password }: RegisterParams) => {
  return await axios.post(
    `${END_POINT}/auth/register`,
    {
      email,
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

const getUserNotes = async (userId: string) => {
  return await customRequest({
    url: `http://localhost:8080/note/user/61f784aff7c30568935d7adf`,
    method: "GET",
  });
};

const addNote = async (note: Omit<Note, "id">) => {
  return await customRequest({
    url: "/notes",
    method: "POST",
    data: note,
  });
};

const useGetUserNotes = (userId: string) => {
  return useQuery(["userNotes", userId], async () => {
    return getUserNotes(userId);
  });
};

const useAddNoteMutation = () => {
  return useMutation(addNote);
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

const getUserCredentials = () => {
  if (!isServer) {
    const user = localStorage.getItem("user");

    if (user) {
      return {
        user: JSON.parse(user) as User,
      };
    }
  }
  return null;
};

const useUserCredentials = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isServer) {
      localStorage.getItem("user") &&
        setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  return {
    user,
  };
};

const userLogout = () => {
  if (!isServer) {
    localStorage.removeItem("user");
    Router.push("/");
  }
};

export {
  useLoginMutation,
  useRegisterMutation,
  useGetUserNotes,
  useAddNoteMutation,
  getUserCredentials,
  useUserCredentials,
  userLogout,
};
