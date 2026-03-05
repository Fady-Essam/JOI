import joi from "joi";

export const login = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net", "edu"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,25}$/)),
  })
  .required();

export const signup = {
  body: login
    .append({
      username: joi
        .string()
        .pattern(new RegExp(/^[A-Z][a-z]{1,24}\s[A-Z][a-z]{1,24}$/))
        .required(),
      phone: joi
        .string()
        .pattern(new RegExp(/^(02|2|\+2)?01[0-25]\d{8}$/))
        .required(),
      confirmPassword: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({ "any.only": "confirmPassword must match password" }),
    })
    .required(),

  params: joi.object({
    lang: joi.string().valid("ar", "en").required(),
  }),
};
