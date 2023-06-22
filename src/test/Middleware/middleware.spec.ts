import DeviceDetector from "device-detector-js";
import { normalizeDeviceInfo } from "../../Utilities/Utils";
import { middleWare } from "../../Middleware/middleware";

jest.mock("device-detector-js");
jest.mock("../../Utilities/Utils");

let deviceDetectorMock = {
  deviceDetector: jest.fn(),
};

let normalizeDeviceInfoMock = {
  normalizeDeviceInfo: jest.fn(),
};

describe("Middleware test suite", () => {
  // Set up test data
  let userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";
  let device: ReturnType<DeviceDetector["parse"]> = {
    client: {
      type: "unknown",
      name: "unknown",
      version: "unknown",
      engine: "unknown",
      engineVersion: "unknown",
    },
    os: { name: "Windows", version: "10", platform: "x64" },
    device: { type: "desktop", brand: "", model: "" },
    bot: null,
  };

  beforeEach(() => {
    deviceDetectorMock.deviceDetector.mockImplementation(() => userAgent);
    normalizeDeviceInfoMock.normalizeDeviceInfo.mockReturnValue(device);
  });

  it("should set req.device based on user-agent", () => {
    const req: any = { headers: { "user-agent": userAgent } };
    const res: any = {};
    const next = jest.fn();

    const middlewareFunc = middleWare();
    middlewareFunc(req, res, next);

    expect(req.device).toEqual(device);
    expect(next).toHaveBeenCalled();
  });

  it.skip("should set req.device to 'User agent not found' if user-agent is missing", () => {
    const req: any = { headers: {} };
    const res: any = {};
    const next = jest.fn();

    const middlewareFunc = middleWare();
    middlewareFunc(req, res, next);

    expect(req.device).toEqual({ message: "User agent not found" });
    expect(next).toHaveBeenCalled();
  });
});
