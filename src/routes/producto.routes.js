import { Router } from "express";
import { findAll, findOne } from "../controllers/producto.controller";

const router = Router();

router.get("/items", findAll);

router.get("/items/:id", findOne);

export default router;
