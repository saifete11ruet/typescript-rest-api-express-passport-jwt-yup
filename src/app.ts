import dotenv from "dotenv";
dotenv.config();
import config from "config";
import express from "express";
import router from "./routes";
import connect from "./utils/connect";
import swaggerDocs from "./utils/swagger";

const app = express();
app.use(express.json());

app.use(router);
const port = config.get<number>("port");

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err.message) {
      res.status(500).send(err.message);
    }
    res.status(500).send("There is an Error");
  }
);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  await connect();
  swaggerDocs(app, port);
});
