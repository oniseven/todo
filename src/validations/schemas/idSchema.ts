import Joi from "joi";
import JoiMessage from "../../constants/joi.message";

export const idSchema = Joi.object({
  id: Joi.number().label('ID').required().messages({
    "any.required": JoiMessage.required
  })
});