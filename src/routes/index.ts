import { Request, Response, Router } from "express";
import AsyncHandler from "../middlewares/AsyncHandler";
import { NotFoundException } from "../exceptions/NotFoundException";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";
import PrometheusHandler from "../middlewares/PrometheusHandler";
import { TodoData, validateCreateTodo, validateUpdateTodo } from "../validations/todoValidation";
import authController from "../controllers/authController";
import authValidation from "../validations/authValidation";
import { JWTValidation } from "../middlewares/JWTValidation";

const routes = Router();

// @desc Root
// @route GET /
routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Hello there! Are you lost?",
  });
});

// @desc metrics untuk monitoring API Server
// @route GET /
routes.get("/metrics", async (req, res) => {
  try {
    const metrics = await PrometheusHandler.prometheus.register.metrics(); // Await metrics collection

    res.set("Content-Type", PrometheusHandler.prometheus.register.contentType);
    res.end(metrics); // Send metrics as string
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).send("Error fetching metrics"); // Handle error fetching metrics
  }
});

routes.post("/auth", authValidation, AsyncHandler(authController));

routes.use(JWTValidation);
routes.get("/todos", AsyncHandler(getAllTodos));
routes.post("/todos", validateCreateTodo, AsyncHandler(createTodo));
routes.put("/todos/:id", validateUpdateTodo, AsyncHandler(updateTodo));
routes.delete("/todos/:id", AsyncHandler(deleteTodo));

routes.all("*", (req: Request, res: Response, next) => {
  const err = new NotFoundException("404 Not Found!");
  next(err);
});

export default routes;
