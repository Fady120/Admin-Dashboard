import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

var app = express();

router.get("/sales", getSales);

app.use('/get', router);

export default router;
