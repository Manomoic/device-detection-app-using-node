import DeviceDetector from "device-detector-js";
import { middleWare } from "../../Middleware/middleware";
import { Request, Response } from "express";

jest.mock("device-detector-js");
jest.mock("../../Utilities/Utils");

let deviceDetectorMock = {
  deviceDetector: jest.fn(),
};

let normalizeDeviceInfoMock = {
  normalizeDeviceInfo: jest.fn(),
};

interface CustomRequest extends Request {
  device?: any;
  headers: {
    [key: string]: string | undefined;
    "user-agent"?: string;
  };
}

describe("middleWare", () => {
  const mockNext = jest.fn();
  const mockRes = {} as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set req.device with normalized device info when user agent is present", () => {
    const mockReq: Partial<CustomRequest> = {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    };

    const mockDevice = {
      os: "Windows",
      aspectRatio: "16:9",
      osVersion: "10",
      primaryHardwareType: "desktop",
    };

    DeviceDetector.prototype.parse = jest.fn().mockReturnValue(mockDevice);

    middleWare()(mockReq as CustomRequest, mockRes, mockNext);

    expect(DeviceDetector.prototype.parse).toHaveBeenCalledWith(
      (mockReq.headers as { "user-agent": string })["user-agent"]
    );
    expect(mockReq.device).toEqual(mockDevice);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should set req.device with an error message when user agent is not present", () => {
    const mockReq: Partial<CustomRequest> = {
      headers: {},
    };

    middleWare()(mockReq as CustomRequest, mockRes, mockNext);

    expect(mockReq.device).toEqual({ message: "User agent not found" });
    expect(mockNext).toHaveBeenCalled();
  });
});
