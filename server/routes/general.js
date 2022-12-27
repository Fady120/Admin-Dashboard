import express from "express";
import { getUserByRole, getUserByEmail, getDashboardStats } from "../controllers/general.js";

const router = express.Router();

router.get("/user", getUserByRole);
router.get("/user/:email", getUserByEmail);
router.get("/dashboard", getDashboardStats);

var app = express();
app.use('/get', router);

export default router;
