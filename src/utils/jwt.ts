import jwt, { Secret } from "jsonwebtoken";

import { User } from "../entities/User";

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export async function generateToken(user: User) {
  const token = jwt.sign({ id: user._id }, SECRET_KEY);
  return token;
}

export async function decodeToken(token: string) {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
}
