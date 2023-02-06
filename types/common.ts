export interface Pog {
  pog: string;
}

export interface ResponseSuccess<T = any> {
  status: 'ok';
  data?: T;
  successMsg?: string;
}

interface ResponseError {
  status: 'error';
  errorMsg?: string;
}

export type PromiseResp<T = any> = ResponseError | ResponseSuccess<T>;

export type NuiMessageData<T = {}> = NuiAppDataMessage<T> | NuiToggleAppMessage<T>;

export interface NuiMessageDataNuiMessage<T = unknown> {
  event: string;
  data: NuiMessageData<T>;
}

export enum UIApplications {}

export interface NuiToggleAppMessage<T = {}> {
  app: UIApplications;
  data: T;
  visible: boolean;
}

export interface NuiUIDataMessage<T = {}> {
  key: string;
  value: any;
}

export interface NuiAppDataMessage<T = {}> {
  app: UIApplications;
  data: T;
  action: string;
}