import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { Product } from "./product.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Quantity {
  @prop({ default: null })
  ProductId: string;

  @prop({ required: true })
  Quantity: number;
}

const QuantityModel = getModelForClass(Quantity);
export default QuantityModel;
