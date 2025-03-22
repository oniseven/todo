import { NextFunction, Request, Response } from "express";

const RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  // req.userKey = headers["user-key"];

  next();
};

export default RequestHandler;
