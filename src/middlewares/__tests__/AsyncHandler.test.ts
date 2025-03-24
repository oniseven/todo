import AsyncHandler from "../AsyncHandler";

describe("AsyncHandler Test", () => {
  let mockFn: jest.Mock;
  let mockNext: jest.Mock;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockFn = jest.fn();
    mockNext = jest.fn();
    mockReq = {};
    mockRes = {};
  });

  it("should call the provided function and pass arguments correctly", async () => {
    mockFn.mockResolvedValue("success");
    const wrappedFn = AsyncHandler(mockFn);

    await wrappedFn(mockReq, mockRes, mockNext);

    expect(mockFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should handle errors and call next", async () => {
    const mockError = new Error("Generic error");
    mockFn.mockRejectedValue(mockError);
    const wrappedFn = AsyncHandler(mockFn);

    await wrappedFn(mockReq, mockRes, mockNext);

    expect(mockFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
