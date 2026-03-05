import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/utils/index.js";
import * as validators from "./auth.validation.js";
import { validation } from "../../middleware/index.js";

const router = Router();
router.post(
  "/signup",
  validation(validators.signup),
  async (req, res, next) => {
    const account = await signup(req.body);
    return successResponse({
      res,
      status: 201,
      data: { account },
    });
  },
);

router.post("/login", validation(validators.login), async (req, res, next) => {
  const account = await login(req.body, `${req.protocol}://${req.host}`);
  return successResponse({
    res,
    status: 200,
    data: { account },
  });
});

export default router;
