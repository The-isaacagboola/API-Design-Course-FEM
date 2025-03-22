import express from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";

const router = express.Router();

// Products
router.get("/product", (req, res) => {
  res.json({ message: "Hello theere" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.get("/product", () => {});
router.post("/product", body("name").isString(), handleInputErrors, () => {});
router.delete("/product/:id", () => {});

// Updates
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.get("/update", () => {});
router.post(
  "/update",
  [
    body("title").optional(),
    body("body").optional(),
    oneOf([
      check("status").equals("inprogress"),
      check("status").equals("shipped"),
      check("status").equals("deprecated"),
    ]),
    body("version").optional(),
    body("product").contains(["name", "belongsTo"]),
  ],
  () => {}
); //title, body, product
router.delete("/update/:id", () => {});

//Update Points
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.get("/updatepoints", () => {});
router.post(
  "/updatepoints",
  [body("name").notEmpty(), body("description").isUUID()], //name description belongsTo
  () => {}
);
router.delete("/updatepoints/:id", () => {});

// Users
router.post("/user", (req, res) => {
  const { username, password } = req.body;
});

export default router;
