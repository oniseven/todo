import { NextFunction, Request, Response } from "express";
import { UnauthorizeException } from "../../exceptions/UnauthorizeException";
import { TokenExpiredError, verify } from "jsonwebtoken";

// Mock environment variables
process.env.JWT_ENCRYPTION = "secret";
process.env.JWT_ISSUER = "issuer";

import { JWTValidation } from "../JWTValidation";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  TokenExpiredError: class MockTokenExpiredError extends Error {
    constructor() {
      super("Token Expired");
    }
  },
}));

describe("JWTValidation Test", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      payload: "",
      userToken: "",
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      noData: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call next if the token is valid", () => {
    const token = "this.is.valid.token";
    const payload = { id: 1, username: "John" };
    const error = new UnauthorizeException("Missing or Invalid Credential!");

    (verify as jest.Mock).mockReturnValueOnce(payload);

    req.headers = { authorization: `Bearer ${token}` };

    JWTValidation(req as Request, res as Response, next);

    expect(verify).toHaveBeenCalledWith(token, "secret");
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(error);
    expect(req.payload).toEqual(payload);
    expect(req.userToken).toBe(token);
  });

  it("should throw UnauthorizeException when token is missing", () => {
    req.headers = {};
    const error = new UnauthorizeException("Missing or Invalid Credential!");

    JWTValidation(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(verify).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.noData).not.toHaveBeenCalled();
  });

  it("should return 401 if the token is expired", () => {
    const token = "token.is.expired";

    req.headers = { authorization: `Bearer ${token}` };

    (verify as jest.Mock).mockImplementationOnce(() => {
      throw new TokenExpiredError("Token expired", new Date());
    });

    JWTValidation(req as Request, res as Response, next);

    expect(verify).toHaveBeenCalledWith(token, "secret");

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
    expect(res.noData).toHaveBeenCalledWith(false, 'Credential is expired!');
  });

  it("should call next with error if the toke is invalid", () => {
    const token = "token.is.invalid";
    const error = new Error('Token Invalid');
    req.headers = { authorization: `Bearer ${token}` };

    (verify as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    JWTValidation(req as Request, res as Response, next);

    expect(verify).toHaveBeenCalledWith(token, 'secret');

    expect(next).toHaveBeenCalledWith(error);

    expect(res.status).not.toHaveBeenCalled();
  });
});
