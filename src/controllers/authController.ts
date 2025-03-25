import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../configs";
import { User } from "../models/User";
import { ERROR_MESSAGE } from "../constants/messages";
import { UnauthorizeException } from "../exceptions/UnauthorizeException";

import { JwtPayload } from "../types";

const authController: RequestHandler = async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  // find user by username
  const user = await User.findOne({
    where: { username },
  });

  if (!user) throw new UnauthorizeException(ERROR_MESSAGE.AUTH.FAILED);

  // validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new UnauthorizeException(ERROR_MESSAGE.AUTH.FAILED);

  const payload: JwtPayload = {
    id: user.encryptedID,
    username: user.username,
  };
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRED,
  });

  res.withData(token);
};

export default authController;
