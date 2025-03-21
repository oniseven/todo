import { RequestHandler } from "express";
import { Todo } from "../models/Todo";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages";
import { validateUserInput } from "../utils/InputValidationUtils";
import { todoCreateSchema, todoUpdateSchema } from "../validations/schemas/todoSchema";
import { idSchema } from "../validations/schemas/idSchema";
import { TodoData } from "../validations/todoValidation";


const TodoSuccessMessage = SUCCESS_MESSAGE.TODOS;
const TodoErrorMessage = ERROR_MESSAGE.TODOS;

export const getAllTodos: RequestHandler = async (_, res) => {
  const todos = await Todo.findAll();
  res.withData(todos);
};

export const createTodo: RequestHandler = async (req, res) => {
  const input = req.validInput;

  await Todo.create(input);
  res.noData(true, TodoSuccessMessage.CREATED);
};

export const updateTodo: RequestHandler<{ id: number }> = async (req, res) => {
  const todoId = req.params.id;
  const input = req.validInput as TodoData;

  const [updated] = await Todo.update(input, {
    where: {
      id: todoId,
    },
  });
  if (!updated) {
    res.status(404).noData(false, TodoErrorMessage.NOT_FOUND);
    return;
  }

  const todo = await Todo.findOne({
    where: {
      id: todoId,
    },
  });
  res.withData(todo);
};

export const deleteTodo: RequestHandler<{ id: number }> = async (req, res) => {
  const todoId = req.params.id;

  const deleted = await Todo.destroy({
    where: {
      id: todoId,
    },
  });

  if (!deleted) {
    res.status(404).noData(false, TodoErrorMessage.DELETED);
    return;
  }

  res.noData(true, TodoSuccessMessage.DELETED);
};
