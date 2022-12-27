import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

var app = express();

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

app.use('/get', router);

export default router;
