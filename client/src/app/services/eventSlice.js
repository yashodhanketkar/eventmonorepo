import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    {
      id: "1",
      name: "hello",
      date: "world",
    },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    add: (state, action) => {
      state.events.push(action.payload);
    },
    remove: (state, action) => {
      state.events = state.events.filter((s) => s.id !== action.payload);
    },
    update: (state, action) => {
      const index = state.events.findIndex((s) => s.id === action.payload.id);
      state.events[index] = action.payload;
    },
  },
});
