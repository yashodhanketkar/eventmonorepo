import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "http://localhost:5555/api/";

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
    register: builder.mutation({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: "users/",
        method: "GET",
      }),
    }),
    listEvent: builder.query({
      query: () => ({
        url: "events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `events/${id}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    postEvent: builder.mutation({
      query: (body) => ({
        url: "events",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    editEvent: builder.mutation({
      query: (data) => ({
        url: `events/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    postFile: builder.mutation({
      query: (body) => ({
        url: "file/upload",
        method: "POST",
        formData: true,
        body: body,
      }),
    }),
    storeFile: builder.mutation({
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
