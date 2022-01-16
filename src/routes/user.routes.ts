import express from "express";

import {
  createUserSchema,
  setPasswordSchema,
  loginSchema,
} from "../schema/user.schema";
import validatePayload from "../middleware/validatePayload";
import {
  createUserHandler,
  setPasswordHandler,
  loginHandler,
} from "../controller/user.controller";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

/**
 * @openapi
 * '/registration':
 *  post:
 *     tags:
 *     - User Registration
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post(
  "/registration",
  validatePayload(createUserSchema),
  createUserHandler
);

/**
 * @openapi
 * '/set-password':
 *  post:
 *     tags:
 *     - Set Password
 *     summary: Set User Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SetPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/set-password",
  [authenticateJWT, validatePayload(setPasswordSchema)],
  setPasswordHandler
);

/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - Login
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Bad request
 */
router.post("/login", validatePayload(loginSchema), loginHandler);

export default router;
