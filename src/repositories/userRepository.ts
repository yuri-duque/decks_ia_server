import mongoose from "mongoose";
import { UserModel } from "./db/models/userModel";
import CustomError from "../utils/customError";
import { User } from "../entities/User";

export default class UserRepository {
  _model!: mongoose.Model<User>;

  async _initModel() {
    const userModel = new UserModel();
    this._model = await userModel.create();
  }

  async getByEmail(email: string): Promise<User | undefined> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.findOne({ email });

      return result?.toObject<User>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to get user by email");
    }
  }

  async getByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.findOne({ email, password });

      return result?.toObject<User>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to get user by email");
    }
  }

  async create(user: User): Promise<User> {
    try {
      if (!this._model) await this._initModel();

      const result = await this._model.create(user);

      return result.toObject<User>();
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to create user");
    }
  }

  async update(id: string, user: User): Promise<void> {
    try {
      if (!this._model) await this._initModel();

      await this._model.updateOne({ _id: id }, user);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error to update user");
    }
  }
}
