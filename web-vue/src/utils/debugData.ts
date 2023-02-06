import type { NuiMessageData } from "@types";
import { isEnvBrowser } from "./misc";

interface DebugEvent<T = any> {
  event: string;
  data: NuiMessageData<T>;
}

/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const debugData = <P>(events: DebugEvent<P>[], timer = 1000): void => {
  if (isEnvBrowser()) {
    for (const ev of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: {
              event: ev.event,
              data: ev.data,
            },
          })
        );
      }, timer);
    }
  }
};
