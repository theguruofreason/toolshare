import { SafeParseError, SafeParseReturnType, Schema } from "zod";
import { ValidationError } from "../types/common";


// eslint-disable-next-line @typescript-eslint/ban-types
export function tryParse<T>(body: T, schema: Schema, next: Function): T | SafeParseReturnType<T, T> {
  const result = schema.safeParse(body);
  if (result.success) {
    return result.data;
  }
  const error = result.error as ValidationError;
  error.code = 400;
  next(error);
  return result;
}