import { BadRequestException } from "../common/utils/index.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const keys = Object.keys(schema) || [];
    const errors = [];
    for (const key of keys) {
      const validationResult = schema[key].validate(req[key], {
        abortEarly: false,
      });
      if (validationResult.error) {
        errors.push({
          key,
          details: validationResult.error.details?.map((elem) => {
            return { message: elem.message, path: elem.path };
          }),
        });
      }
    }
    if (errors.length) {
      throw BadRequestException({
        message: "Validation Error",
        extra: validationResult.error,
      });
    }
    next();
  };
};
