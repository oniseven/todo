import { ObjectSchema } from "joi";
import { ClientException } from "../exceptions/ClientException";

export const validateUserInput = (schema: ObjectSchema, input: object): any => {
  const { error, value } = schema.validate(input);
  
  if (error) throw new ClientException(error.details[0].message);

  return value;
};
