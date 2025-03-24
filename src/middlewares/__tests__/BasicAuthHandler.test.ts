process.env.USERNAME_METRICS = "admin";
process.env.PASSWORD_METRICS = "admin";

import { NextFunction, Request, Response } from "express";
import BasicAuthHandler from "../BasicAuthHandler";

describe("BasicAuthHandler Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it("should allow access with correct credentials", () => {
    const authHeader = Buffer.from('admin:admin').toString('base64');
    req.headers = { authorization: `basic ${authHeader}` };

    BasicAuthHandler(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.set).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should deny access with incorrect username", () => {
    const authHeader = Buffer.from('user:admin').toString('base64');
    req.headers = { authorization: `basic ${authHeader}` };

    BasicAuthHandler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication required.');
  });

  it("should deny access with incorrect password", () => {
    const authHeader = Buffer.from('admin:password').toString('base64');
    req.headers = { authorization: `basic ${authHeader}` };

    BasicAuthHandler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication required.');
  });

  it("should deny access if no credential are provided", () => {
    req.headers = {};

    BasicAuthHandler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication required.');
  });

  it("should deny access if authorization header is invalid", () => {
    req.headers = {
      authorization: "invalid"
    };

    BasicAuthHandler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication required.');
  });
});
