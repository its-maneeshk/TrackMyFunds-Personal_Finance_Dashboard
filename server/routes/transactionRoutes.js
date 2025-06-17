const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", auth, createTransaction);
router.get("/", auth, getTransactions);
router.delete("/:id", auth, deleteTransaction);

module.exports = router;
