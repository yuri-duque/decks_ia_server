import { BaseEntity } from "./BaseEntity";

export enum Gender {
  "male" = "male",
  "female" = "female",
}

export class User extends BaseEntity {
  email: string;
  password: string;
  name: string;
  lastLogin?: Date;

  constructor({ _id, createdAt, updatedAt, email, password, name }: User) {
    super({ _id, createdAt, updatedAt });

    this.email = email;
    this.password = password;
    this.name = name;
  }
}
