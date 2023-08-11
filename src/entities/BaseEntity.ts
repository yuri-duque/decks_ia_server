export class BaseEntity {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ _id, createdAt, updatedAt }: BaseEntity) {
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
