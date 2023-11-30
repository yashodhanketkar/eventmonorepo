import { model, Schema } from "mongoose";

const EventSchema = new Schema(
  {
    name: String,
    date: String,
    eventType: {
      type: String,
      enum: ["video", "image", ""],
      default: "",
    },
    eventFile: String,
    attendeesFile: String,
    attendeesList: [
      {
        name: String,
        mobile: String,
      },
    ],
    attendeesCount: Number,
    link: String,
  },
  {
    timestamps: true,
  }
);

export const EventModel = model("Event", EventSchema);
