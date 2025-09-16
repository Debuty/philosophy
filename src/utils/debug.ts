const isDebugEnabled =
  import.meta.env.VITE_ENABLE_DEBUG === 'true' || import.meta.env.DEV;

export const debugLog = (...args: unknown[]) => {
  if (isDebugEnabled) {
    console.log(...args);
  }
};
