import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../service/user.service";
import config from "config";
import * as jwt from "jsonwebtoken";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req: Request, res: Response) {
  const body = req.body;

  try {
    const token: string = jwt.sign(
      { email: body.email },
      config.get<string>("jwtSecret")
    );
    const user = await createUser(body);

    await sendEmail({
      to: user.email,
      from: config.get<string>("senderEmail"),
      subject: "Set your Password",
      text: `Please set your password using this token: ${token}`,
    });

    return res.send("User created successfully. Email Sent with token.");
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send("User already exists");
    }
    return res.status(500).send(error);
  }
}

export async function setPasswordHandler(req: Request, res: Response) {
  try {
    if (res.locals.user.password !== null) {
      return res.status(400).send("Password already set");
    }
    res.locals.user.password = req.body.password;
    await res.locals.user.save();
    return res.send("Password set successfully");
  } catch (error: any) {
    return res.status(500).send(error);
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.username);
    const errMsg = "Username or Password is invalid";
    if (!user) {
      return res.status(400).send(errMsg);
    }

    const isValid = await user.validatePassword(req.body.password);

    if (!isValid) {
      return res.status(400).send(errMsg);
    }

    const accessToken: string = jwt.sign(
      { email: user.email },
      config.get<string>("jwtSecret"),
      { expiresIn: "15m" }
    );

    const refreshToken: string = jwt.sign(
      { email: user.email },
      config.get<string>("jwtSecret"),
      {
        expiresIn: "1y",
      }
    );
    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return res.status(500).send(error);
  }
}
