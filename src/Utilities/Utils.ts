import { IExternalDeviceInfo } from "../Interface/appInterfaces";

export function normalizeDeviceInfo(
  external: IExternalDeviceInfo
) {
  return {
    os: external.os || "",
    aspectRatio: external.aspectRatio || "",
    osVersion: external.osVersion || "",
    formFactor: normalizeFormFactor(external.primaryHardwareType),
  };
}

export function normalizeFormFactor(external: string): string {
  switch (external?.toLowerCase()) {
    case "desktop":
      return "desktop";
    case "tablet":
      return "tablet";
    default:
      return "mobile";
  }
}

export function normalizeBrowser(external: string, os: string): string {
  switch (os) {
    case "android": {
      switch (external?.toLowerCase()) {
        case "chrome mobile":
          return "Chrome for Android";
        case "firefox":
          return "Firefox for Android";
        case "uc browser":
          return "UC Browser for Android";
      }
      break;
    }
    case "ios": {
      switch (external?.toLowerCase()) {
        case "safari":
          return "iOS Safari";
        case "chrome mobile":
          return "iOS Chrome";
      }
      break;
    }
    default: {
      switch (external?.toLowerCase()) {
        case "internet explorer":
          return "IE";
      }
    }
  }

  return external || "";
}
