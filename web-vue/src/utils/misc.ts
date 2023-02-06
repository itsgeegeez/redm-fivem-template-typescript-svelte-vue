export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;
