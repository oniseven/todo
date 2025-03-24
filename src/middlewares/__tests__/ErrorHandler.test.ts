import { NextFunction, Request, Response } from "express";
import { CustomException } from "../../exceptions/CustomException";
import ErrorHandler from "../ErrorHandler";

describe("ErrorHandler Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle CustomException with status code and message", () => {
    const customError = new CustomException("Custom error message", 400, {
      additional: "info",
    });

    ErrorHandler(customError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: "Custom error message",
      },
      info: {
        additional: "info",
      },
    });
  });

  it("should handle CustomException without additional info", () => {
    const customError = new CustomException("Custom error message", 404);

    ErrorHandler(customError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: "Custom error message",
      },
    });
  });

  it("should handle generic Error with default response", () => {
    const genericError = new Error("Generic error message");

    ErrorHandler(genericError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: "Server error, please try again later",
      },
    });
  });

  it("should handle CustomException with default status code (500)", () => {
    const customError = new CustomException("Custom error message");

    ErrorHandler(customError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      metadata: {
        status: false,
        message: "Custom error message",
      },
    });
  });
});
