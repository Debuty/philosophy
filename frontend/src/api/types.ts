export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR"
  | "UNKNOWN";

export type ApiFieldError = {
  field: string;
  message: string;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: ApiErrorCode;
  readonly details?: ApiFieldError[];

  constructor(
    statusCode: number,
    code: ApiErrorCode,
    message: string,
    details?: ApiFieldError[],
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export type ApiSuccess<T> = {
  data: T;
  message?: string;
};

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
