import Joi from "joi";
import JoiMessage from "../../constants/joi.message";

export const todoCreateSchema = Joi.object().keys({
  title: Joi.string().label('Title').required().messages({
    "any.required": JoiMessage.required,
    "string.base": JoiMessage.string,
    "string.empty": JoiMessage.empty
  }),
  description: Joi.string().label('Description').required().messages({
    "any.required": JoiMessage.required,
    "string.base": JoiMessage.string,
    "string.empty": JoiMessage.empty
  }),
  complete: Joi.number().label('Complete').messages({
    "number.base": JoiMessage.number,
  })
});

export const todoUpdateSchema = Joi.object({
  id: Joi.number().label('ID').required().messages({
    "any.required": JoiMessage.required,
    "number.base": JoiMessage.string,
    "number.empty": JoiMessage.empty,
  }),
}).concat(todoCreateSchema);