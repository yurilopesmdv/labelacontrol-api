import httpStatus from "http-status";

export function throwError(statusCode: number, message?: string): never {
  console.log("Throwing error:", statusCode, message);
  const defaultMessage = (httpStatus as any)[statusCode] || "Unknown Error";

  const error = new Error(message || defaultMessage);
  (error as any).statusCode = statusCode;

  throw error;
}
