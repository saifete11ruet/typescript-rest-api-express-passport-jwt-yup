import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { Quantity } from "./quantity.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Product {
  @prop({ required: true })
  Name: string;

  @prop({ required: true })
  Price: number;

  @prop({ required: true })
  Details: string;

  @prop({ required: true, ref: () => Quantity })
  Quantity: Ref<Quantity>;

  @prop({ required: true })
  Sizes: string[];

  @prop({ required: true })
  SKU: string;

  @prop({ required: true })
  Product_images: string[];
}

const ProductModel = getModelForClass(Product);
export default ProductModel;
