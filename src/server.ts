import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
app.use((req, res, next) => {
  req.sh_secret = "doggy";
  next();
});

To show how middlewares run on every request that comes through the defined path
*/

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    message: "Hello there",
  });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;
