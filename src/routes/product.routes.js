import { Router } from "express";
import { findAll, findOne } from "../controllers/product.controller";

const router = Router();

router.get("/items", findAll);

router.get("/item/:id", findOne);

export default router;
