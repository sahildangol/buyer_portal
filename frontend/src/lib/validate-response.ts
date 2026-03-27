import { z } from "zod";

export const validateResponse = <T>(
  schema: z.ZodSchema<T>,
  payload: unknown,
  context: string,
): T => {
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    const validationError = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join(", ");

    throw new Error(`Invalid ${context} response: ${validationError}`);
  }

  return parsed.data;
};
