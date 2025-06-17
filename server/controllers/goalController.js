const Goal = require("../models/Goal");
const Transaction = require("../models/Transaction");

exports.createGoal = async (req, res) => {
  const { title, targetAmount, currentAmount, deadline } = req.body;

  try {
    const goal = await Goal.create({
      user: req.user.id,
      title,
      targetAmount,
      currentAmount,
      deadline,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to create goal" });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { currentAmount } = req.body;

  try {
    const updated = await Goal.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: { currentAmount } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Goal not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update goal" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const deleted = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Goal not found" });

    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete goal" });
  }
};
