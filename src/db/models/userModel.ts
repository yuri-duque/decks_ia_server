import mongoose, { Schema } from "mongoose";
import { BaseClass, BaseModel } from "./baseModel";

export enum Gender {
  "male" = "male",
  "female" = "female",
}

export class User extends BaseClass {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  lastLogin?: Date;

  constructor({ _id, createdAt, updatedAt, email, password, name, gender }: User) {
    super({ _id, createdAt, updatedAt });

    this.email = email;
    this.password = password;
    this.name = name;
    this.gender = gender;
  }
}

const userSchema: Schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    lastLogin: { type: Date, default: null },
  },
  { versionKey: false, autoIndex: true },
);

export class UserModel extends BaseModel<User> {
  async create(): Promise<mongoose.Model<User>> {
    return super.create("Users", userSchema);
  }
}
