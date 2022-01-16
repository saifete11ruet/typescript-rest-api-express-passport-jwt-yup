import { object, string, ref } from "yup";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - phone
 *        - occupation
 *      properties:
 *        name:
 *          type: string
 *          default: Jane Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        phone:
 *          type: string
 *          default: +880123213123
 *        occupation:
 *          type: string
 *          default: Engineer
 */
export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: string().required("Phone is required"),
    occupation: string().required("Occupation is required"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    SetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *          default: 123456
 *        passwordConfirmation:
 *          type: string
 *          default: 123456
 */
export const setPasswordSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum."),
    passwordConfirmation: string()
      .required("Password Confirmation is required")
      .oneOf([ref("password"), null], "Passwords must match"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: johndoe@gmail.com
 *        password:
 *          type: string
 *          default: 123456
 *    LoginResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 */
export const loginSchema = object({
  body: object({
    username: string().required("Username or Email is required"),
    password: string().required("Password is required"),
  }),
});
