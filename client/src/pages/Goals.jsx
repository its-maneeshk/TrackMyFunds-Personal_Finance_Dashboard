import React, { useState, useEffect } from "react";
import axios from "axios";
import GoalCard from "../components/GoalCard";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!title || !targetAmount) return;

    try {
      const res = await axios.post(
        "/api/goals",
        {
          title,
          targetAmount,
          deadline,
          currentAmount: 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setGoals([...goals, res.data]);
      setTitle("");
      setTargetAmount("");
      setDeadline("");
    } catch (err) {
      console.error("Failed to add goal:", err);
    }
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g._id !== id));
  };

  const handleUpdate = (updatedGoal) => {
    setGoals(goals.map((g) => (g._id === updatedGoal._id ? updatedGoal : g)));
  };

  return (
    
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🎯 Savings Goals</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={handleAddGoal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Goal
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard
            key={goal._id}
            goal={goal}
            token={token}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Goals;
