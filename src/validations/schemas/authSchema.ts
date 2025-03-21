import Joi from "joi";
import JoiMessage from "../../constants/joi.message";

const authSchema = Joi.object({
  username: Joi.string().label("Username").required().messages({
    "any.required": JoiMessage.required,
    "string.base": JoiMessage.string,
    "string.empty": JoiMessage.empty,
  }),
  password: Joi.string().label("Password").required().messages({
    "any.required": JoiMessage.required,
    "string.base": JoiMessage.string,
    "string.empty": JoiMessage.empty,
  }),
});

export default authSchema;
