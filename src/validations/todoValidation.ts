import { RequestHandler } from "express";
import { todoCreateSchema, todoUpdateSchema } from "./schemas/todoSchema";
import { ClientException } from "../exceptions/ClientException";
import { idSchema } from "./schemas/idSchema";

export interface TodoData {
  title: string;
  description: string;
  complete: number;
}

export const validateCreateTodo: RequestHandler = (req, res, next) => {
  const body = req.body as TodoData;

  const { error, value } = todoCreateSchema.validate(body);

  if (error) throw new ClientException(error.details[0].message);

  req.validInput = value;

  next();
};

export const validateUpdateTodo: RequestHandler<{id: number}> = (req, res, next) => {
  const id = req.params.id;
  const body = req.body as TodoData;
  
  const {error, value} = todoUpdateSchema.validate({id, ...body});
  
  if (error) throw new ClientException(error.details[0].message);

  req.validInput = value;
  
  next();
};

export const validateDeleteTodo: RequestHandler<{id: number}> = (req, res, next) => {
  const id = req.params.id;

  const {error, value} = idSchema.validate({id});
  if (error) throw new ClientException(error.details[0].message);

  req.validInput = value;

  next();
}