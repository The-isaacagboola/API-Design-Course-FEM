import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.sh_secret = "doggy";
  next();
});

app.get("/", (req, res) => {
  console.log("Hello from express");
  res.status(200);
  res.json({
    message: "Hello there",
  });
});

app.use("/api", router);

export default app;
