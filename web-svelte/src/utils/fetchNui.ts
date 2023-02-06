/**
* @param eventName - The endpoint eventname to target
* @param data - Data you wish to send in the NUI Callback
*
* @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
*/
export type OptsWithMockData<T> = Partial<RequestInit & { mockResp: T }>;
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

import { addDebug } from "../store/stores";

export async function fetchNui<T = any>(
  eventName: string,
  data: unknown = {},
  opts?: OptsWithMockData<T>,
): Promise<T> {
  const options = {
    ...opts,
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && opts?.mockResp) {
    return opts.mockResp;
  }

  const resourceName = (window as any).GetParentResourceName();

  const sendDate = (new Date()).getTime();

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  const receiveDate = (new Date()).getTime();
  const responseTimeMs = receiveDate - sendDate;

  const yeet = await resp.json()
  await addDebug(eventName, data, 'callback', yeet,  responseTimeMs)

  return yeet;
}
