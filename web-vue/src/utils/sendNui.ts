export function sendNui(eventName: string, data = {}, mock = {}): void {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (!(window as any).GetParentResourceName) return;

  const resourceName = (window as any).GetParentResourceName();

  fetch(`https://${resourceName}/${eventName}`, options);
}
