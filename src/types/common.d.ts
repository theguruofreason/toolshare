import { ZodError } from "zod";

export type ValidationError = ZodError & {
  code: number;
}

export type Error = ValidationError