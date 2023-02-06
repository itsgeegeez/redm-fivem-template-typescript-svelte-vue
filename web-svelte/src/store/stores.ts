import { writable } from "svelte/store";

export const visibility = writable(false);

export const loading = writable(false);


interface IResponse {
  status: string;
  data?: any;
  errorMsg?: string
}

interface IDebug {
  id: number;
  type: string;
  action?: string;
  event?: string;
  body: any;
  resp?: IResponse;
  responseTime?: number;
}

export const debug = writable<IDebug[]>([]);


export const addDebug = async (eventName: string, data: any, type: string, resp?: any, responseTime?: number) => {
  const id = Math.floor(Math.random() * 10000);

  let defaults: IDebug = {
    id,
    type: type,
    body: data,
  }
  if (type === 'callback') {
    defaults.event = eventName
    defaults.resp = resp
    defaults.responseTime = responseTime
  } else {
    defaults.action = eventName
  }

  debug.update((all: any): any => [{ ...defaults, ...debug }, ...all]);

  setTimeout(() => dismissDebug(id), 15000);
};


export const dismissDebug = (id: any) => {
  debug.update((all: any) => all.filter((t: any) => t.id !== id));
};