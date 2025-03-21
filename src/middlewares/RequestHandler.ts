import { NextFunction, Request, Response } from "express";

const RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  req.userKey = headers["user-key"];
  // req.biometricToken = headers["user-cred"];
  // req.device = {
  //   name: headers["user-device"],
  //   modelName: headers["user-model-name"],
  // };

  next();
};

export default RequestHandler;
