import express from "express";
import { analyzeBill } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze", analyzeBill);

export default router;