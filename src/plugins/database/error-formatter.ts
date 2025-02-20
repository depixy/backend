import { Prisma } from "@prisma/client";
import { HttpError } from "#plugins/error";
import { ValidationError } from "#plugins/typebox";
import type { ErrorFormatter } from "#plugins/error";

export const errorFormatter: ErrorFormatter = async function (err) {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError) && !(err instanceof Prisma.PrismaClientUnknownRequestError)) {
    return null;
  }
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return HttpError.internalServerError({ cause: err });
  }
  switch (err.code) {
    case "P2002": {
      if (err.meta && Array.isArray(err.meta.target)) {
        return new ValidationError(err.meta.target.map(field => ({
          message: "Not unique",
          path: `/${field}`
        })));
      }
      return new ValidationError([]);
    }
    case "P2025":
      return new ValidationError([{ message: "Reference id(s) not found", path: "/" }]);
  }
  return HttpError.internalServerError({ cause: err });
};
