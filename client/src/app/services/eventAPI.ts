import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventType, UserType } from "../../types";

const API = "http://localhost:5555/api/";

export type LoginResponse = {
  message: string;
  token: string;
};

export type MeResponse = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export type EventResponse = EventType & {
  attendeesList: {
    name: string;
    mobile: number;
  }[];
};

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("event-token");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, Omit<UserType, "_id">>({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<LoginResponse, Omit<UserType, "_id">>({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
    }),
    me: builder.query<MeResponse, null>({
      query: () => ({
        url: "users/",
        method: "GET",
      }),
    }),
    listEvent: builder.query<EventResponse[], null>({
      query: () => ({
        url: "events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getEvent: builder.query<EventResponse, string>({
      query: (id) => ({
        url: `events/${id}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    postEvent: builder.mutation<EventType[], Partial<EventType>>({
      query: (body) => ({
        url: "events",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    editEvent: builder.mutation<null, Partial<EventType>>({
      query: (data) => ({
        url: `events/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation<null, string>({
      query: (id) => ({
        url: `events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    postFile: builder.mutation<{ url: string }, FormData>({
      query: (body) => ({
        url: "file/upload",
        method: "POST",
        formData: true,
        body: body,
      }),
    }),
    storeFile: builder.mutation<{ url: string }, FormData>({
      query: (body) => ({
        url: "file/store",
        method: "POST",
        formData: true,
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useRegisterMutation } = eventApi;

export const {
  useListEventQuery,
  useGetEventQuery,
  usePostEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} = eventApi;

export const { usePostFileMutation, useStoreFileMutation } = eventApi;
