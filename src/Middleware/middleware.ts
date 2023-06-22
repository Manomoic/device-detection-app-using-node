import DeviceDetector from "device-detector-js";
import { normalizeDeviceInfo } from "../Utilities/Utils";
const deviceDetector = new DeviceDetector();

module.exports = function () {
  return function (req: Request | any, res: Response, next: () => void) {
    const userAgent = req.headers["user-agent"];

    if (typeof userAgent === "string" && userAgent) {
      const device = deviceDetector.parse(userAgent);
      const normalizedDevice = normalizeDeviceInfo(device as any);

      req.device = device || normalizedDevice;
    } else {
      req.device = { message: "User agent not found" };
    }

    next();
  };
};
