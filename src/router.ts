import { Prisma } from "@prisma/client";
import express from "express";

const router = express.Router();

// Products
router.get("/product", (req, res) => {
  console.log(req.sh_secret);
  res.json({ message: "Hello theere" });
});
router.get("/product/:id", () => {});
router.get("/product", () => {});
router.post("/product", () => {});
router.delete("/product/:id", () => {});

// Updates
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.get("/update", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

//Update Points
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.get("/updatepoints", () => {});
router.post("/updatepoints", () => {});
router.delete("/updatepoints/:id", () => {});

// Users
router.post("/user", (req, res) => {
  const { username, password } = req.body;
});

export default router;
