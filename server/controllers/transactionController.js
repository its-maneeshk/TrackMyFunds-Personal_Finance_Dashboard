const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  const { type, category, amount, note, date } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id,
      type,
      category,
      amount,
      note,
      date,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  const { type } = req.query;

  try {
    const filter = { user: req.user.id };
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Transaction.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
