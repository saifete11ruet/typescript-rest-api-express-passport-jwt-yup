import express from "express";
import product from "./product.routes";
import user from "./user.routes";

const router = express.Router();

router.use(user);
router.use(product);

export default router;
