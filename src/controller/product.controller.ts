import { Request, Response } from "express";
import {
  createProduct,
  createQuantity,
  findProductById,
} from "../service/product.service";

export async function createProductHandler(req: Request, res: Response) {
  try {
    const quantity = await createQuantity(req.body);
    req.body.Quantity = quantity._id;

    await createProduct(req.body);
    return res.send("Product created successfully");
  } catch (error: any) {
    return res.status(500).send(error);
  }
}
