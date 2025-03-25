import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../ResponseHandler";
import { ResponseMetadata } from "../../types";

describe("ResponseHandler Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should add withData methode to the response object", () => {
    ResponseHandler(req as Request, res as Response, next);

    expect(res.withData).toBeDefined();

    const responseData = { key: "value" };
    res.withData!(responseData, true, "success");

    const expectMetadata: ResponseMetadata = {
      metadata: {
        status: true,
        message: "success",
      },
      response: responseData,
    };
    expect(res.json).toHaveBeenCalledWith(expectMetadata);
  });

  it("should add noData methode to the response object", () => {
    ResponseHandler(req as Request, res as Response, next);

    expect(res.noData).toBeDefined();

    res.noData!(false, "error");

    const expectMetadata: ResponseMetadata = {
      metadata: {
        status: false,
        message: "error",
      },
    };
    expect(res.json).toHaveBeenCalledWith(expectMetadata);
  });

  it("should add withErrorCode methode to the response object", () => {
    ResponseHandler(req as Request, res as Response, next);

    expect(res.withErrorCode).toBeDefined();

    const responseData = {error: "details"};    
    res.withErrorCode!({
      status: false,
      message: 'error',
      errCode: 'ERR001',
      response: responseData
    });

    const expectMetadata: ResponseMetadata = {
      metadata: {
        status: false,
        message: "error",
        errCode: "ERR001"
      },
      response: responseData,
    };
    expect(res.json).toHaveBeenCalledWith(expectMetadata);
  });

  it("should call next() after adding method", () => {
    ResponseHandler(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});
