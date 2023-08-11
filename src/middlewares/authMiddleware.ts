import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    (req as CustomRequest).token = await decodeToken(token);

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
