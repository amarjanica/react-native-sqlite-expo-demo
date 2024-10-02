// I don't like seeing console.logs, and this can be adjusted to handle different streams
export default {
  log: (...data: any[]) => console.log(...data),
  error: (message?: any, ...optionalParams: any[]) => console.error(message, ...optionalParams),
};
