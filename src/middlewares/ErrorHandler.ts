import { Response, Request, NextFunction } from "express";
import { CustomException } from "../exceptions/CustomException";
import { ResponseMetadata } from "../types";

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let response: ResponseMetadata = {
    metadata: {
      status: false,
      message: "Server error, please try again later",
    },
  };

  if (!(err instanceof CustomException)) {
    res.status(500).json(response);
    return;
  }

  response.metadata.status = false;
  response.metadata.message = err.message;
  if (err.additionalInfo) response.info = err.additionalInfo;

  const statusCode = err.status || 500;
  res.status(statusCode).json(response);
}
