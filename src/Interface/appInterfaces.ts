export interface ILocalStorage {
  length: number;
  setItem(key: string, data: string): void;
  getItem(key: string): string;
  key(key: string): string;
  removeItem(key: string): void;
}

export interface IWindow {}

export interface IExternalDeviceInfo {
  aspectRatio: string;
  browser: string;
  browserVersion: string;
  dpi: number;
  marketingName: string;
  os: string;
  osVersion: string;
  primaryHardwareType: string;
  resolutionHeight: number;
  resolutionWidth: number;
  vendor: string;
  vendorModel: string;
  yearReleased: string;
}

export interface IDeviceInfo {
  os: string;
  osVersion: string;
  formFactor: string;
}
