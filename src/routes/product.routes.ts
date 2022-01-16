import express from "express";
import { createProductSchema } from "../schema/product.schema";
import validatePayload from "../middleware/validatePayload";
import { createProductHandler } from "../controller/product.controller";

import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

/**
 * @openapi
 * '/product':
 *  post:
 *     tags:
 *     - Create Product
 *     summary: Create a new product
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post(
  "/product",
  [authenticateJWT, validatePayload(createProductSchema)],
  createProductHandler
);

export default router;
