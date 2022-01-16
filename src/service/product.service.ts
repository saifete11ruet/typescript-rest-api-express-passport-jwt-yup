import ProductModel, { Product } from "../model/product.model";
import QuantityModel, { Quantity } from "../model/quantity.model";

export function createQuantity(input: Partial<Quantity>) {
  return QuantityModel.create(input);
}

export function createProduct(input: Partial<Product>) {
  return ProductModel.create(input);
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}
