import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
