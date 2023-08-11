import mongoose from "mongoose";
import { connect } from "../config";

export class BaseClass {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ _id, createdAt, updatedAt }: BaseClass) {
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class BaseModel<T> {
  _db!: typeof mongoose;

  async dbconnect() {
    this._db = await connect();
  }

  async create(collectionName: string, schema: mongoose.Schema) {
    if (!this._db) await this.dbconnect();

    return this._db.model<T>(collectionName, schema);
  }
}
