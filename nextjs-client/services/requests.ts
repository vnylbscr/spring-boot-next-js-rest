import { END_POINT } from "@lib/constants";
import axios from "axios";
import {
  CreateNote,
  GetUserNotesParams,
  LoginResponse,
  LoginState,
  Note,
  RegisterParams,
  ResObject,
  WithPagination,
} from "types";

// create a function axios and return a promise and add token to headers
const client = (token?: string) =>
  axios.create({
    baseURL: END_POINT,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

const query = {
  getUserNotes: async (
    params: GetUserNotesParams
  ): Promise<ResObject<WithPagination<Note>>> => {
    const {
      userId,
      completed = false,
      sortBy = "createdAt",
      page = 0,
      size = 10,
      isDescending = true,
      token,
    } = params;
    return await client(token)
      .get(
        `/note/user/${userId}?isDescending=${isDescending}&sortBy=${sortBy}&page=${page}&size=${size}&completed=${completed}`
      )
      .then((res) => res.data);
  },
  getSingleNote: async (
    noteId: string,
    token: string
  ): Promise<ResObject<Note>> => {
    return await client(token)
      .get(`/note?id=${noteId}`)
      .then((res) => res.data);
  },
  getAllNotes: async (token: string): Promise<ResObject<Note[]>> => {
    return await client(token)
      .get(`/note/getAll`)
      .then((res) => res.data);
  },
};

const mutation = {
  login: async (data: LoginState): Promise<ResObject<LoginResponse>> => {
    return await axios.post(`${END_POINT}/auth/login`, data, {
      withCredentials: true,
    });
  },
  register: async ({
    email,
    username,
    password,
  }: RegisterParams): Promise<ResObject<String>> => {
    return await axios
      .post(`${END_POINT}/auth/register`, {
        email,
        username,
        password,
      })
      .then((res) => res.data);
  },
  logout: async (): Promise<ResObject<String>> => {
    return await client()
      .post(`/auth/logout`)
      .then((res) => res.data);
  },
  addNote: async (
    data: CreateNote,
    token: string
  ): Promise<ResObject<Note>> => {
    return await client(token)
      .post(`/note/create`, data)
      .then((res) => res.data);
  },
  searchNote: async (
    data: string,
    user: string,
    token: string
  ): Promise<ResObject<Note[]>> => {
    return await client(token)
      .get(`/note/search?query=${data}&user=${user}`)
      .then((res) => res.data);
  },
  deleteNote: async (
    noteId: string,
    token: string
  ): Promise<ResObject<String>> => {
    return await client(token)
      .delete(`/note?id=${noteId}`)
      .then((res) => res.data);
  },
  updateNote: async (
    noteId: string,
    data: CreateNote,
    token: string
  ): Promise<ResObject<Note>> => {
    return await client(token)
      .put(`/note?id=${noteId}`, data)
      .then((res) => res.data);
  },
  completeNote: async (
    noteId: string,
    token: string
  ): Promise<ResObject<Note>> => {
    return await client(token)
      .post(`/note/complete?id=${noteId}`)
      .then((res) => res.data);
  },
};

export const requests = {
  query,
  mutation,
};
