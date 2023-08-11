import mongoose, { Schema } from "mongoose";
import { BaseModel } from "./baseModel";
import { User } from "../../../entities/User";

const userSchema: Schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastLogin: { type: Date, default: null },
  },
  { versionKey: false, autoIndex: true },
);

export class UserModel extends BaseModel<User> {
  async create(): Promise<mongoose.Model<User>> {
    return super.create("Users", userSchema);
  }
}
