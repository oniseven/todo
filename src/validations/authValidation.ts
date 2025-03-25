import { RequestHandler } from "express";
import authSchema from "./schemas/authSchema";
import { ClientException } from "../exceptions/ClientException";

const authValidation: RequestHandler = (req, res, next) => {
  const body = req.body as {
    username: string;
    password: string;
  };

  const { error, value } = authSchema.validate(body);

  if (error) throw new ClientException(error.details[0].message);

  req.validInput = value;

  next();
};

export default authValidation;
