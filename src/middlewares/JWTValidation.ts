import { NextFunction, Request, Response } from "express";

import { TokenExpiredError, verify } from "jsonwebtoken";
import { UnauthorizeException } from "../exceptions/UnauthorizeException";
import { JwtPayload } from "../types";

const SECRET = process.env.JWT_ENCRYPTION || "";
const ISSUER = process.env.JWT_ISSUER || "";

export const JWTValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (!token)
      throw new UnauthorizeException("Missing or Invalid Credential!");

    const payload = verify(token?.split(" ")[1], SECRET) as JwtPayload;

    req.payload = payload;
    req.userToken = token?.split(" ")[1] || null;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).noData(false, "Credential is expired!");
    } else {
      next(error);
    }
  }
};
