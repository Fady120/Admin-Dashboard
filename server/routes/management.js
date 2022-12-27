import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();

var app = express();
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

app.use('/get', router);

export default router;
