import { Request, Response, Router } from "express";
import { CustomException } from "../exceptions/CustomException";

const routes = Router();

routes.get('/generic-error', function(req: Request, res: Response) {
  throw new Error("Generic Error");
});

routes.get("/custom-error", (req: Request, res: Response) => {
  throw new CustomException("Custom error message", 400, {
    additional: "info",
  });
});

routes.get("/custom-error-no-info", (req: Request, res: Response) => {
  throw new CustomException("Another custom error", 400);
});

routes.get("/", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

export default routes;