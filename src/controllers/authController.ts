import { RequestHandler } from "express";

const authController: RequestHandler = (req, res) => {
  
  const token = 'jwt-token';
  res.withData(token);
}

export default authController;