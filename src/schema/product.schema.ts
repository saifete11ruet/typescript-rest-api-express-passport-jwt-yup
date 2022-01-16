import { object, string, number, array } from "yup";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateProductInput:
 *      type: object
 *      required:
 *        - Name
 *        - Price
 *        - Details
 *        - Quantity
 *        - Sizes
 *        - SKU
 *        - Product_images
 *      properties:
 *        Name:
 *          type: string
 *          default: Shirt
 *        Price:
 *          type: number
 *          default: 24
 *        Details:
 *          type: string
 *          default: Details
 *        Quantity:
 *          type: number
 *          default: 5
 *        Sizes:
 *          type: array
 *          default: ["M","X"]
 *        SKU:
 *          type: string
 *          default: 232sdsd
 *        Product_images:
 *          type: array
 *          default: ["https://afa.png"]
 */
export const createProductSchema = object({
  body: object({
    Name: string().required("Name is required"),
    Price: number().required("Price is required"),
    Details: string().required("Details is required"),
    Quantity: number().required("Quantity is required"),
    Sizes: array().of(string()).required("Sizes are required"),
    SKU: string().required("SKU is required"),
    Product_images: array()
      .of(string())
      .required("Product Images are required"),
  }),
});
