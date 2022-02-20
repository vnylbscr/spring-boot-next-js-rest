import { END_POINT, isServer } from "@lib/constants";
import axios from "axios";
import Router from "next/router";
import { useMutation, useQuery } from "react-query";
import { CreateNote, LoginState, RegisterState } from "types";
import customRequest from "./customReq";




const getUserNotes = async (userId: string) => {
   
};

const addNote = async (note: CreateNote) => {
  return await customRequest({
    url: "/note",
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
  userLogout,
};
