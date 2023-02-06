export async function fetchNui<T = any, P = {}>(eventName: string, data: P, mock?: any): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (!(window as any).GetParentResourceName) {
    return mock ? mock : Promise.resolve();
  }

  const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  return await resp.json();
}
