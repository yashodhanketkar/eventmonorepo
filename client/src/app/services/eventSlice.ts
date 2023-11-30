import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type EventType = {
  id: string;
  name: string;
  date: string;
};

export type EventState = {
  events: EventType[];
};

const initialState: EventState = {
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
    add: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((s) => s.id !== action.payload);
    },
    update: (state, action: PayloadAction<EventType>) => {
      const index = state.events.findIndex((s) => s.id === action.payload.id);
      state.events[index] = action.payload;
    },
  },
});
