import React, { useState } from "react";
import axios from "axios";

const GoalCard = ({ goal, token, onDelete, onUpdate }) => {
  const [currentAmount, setCurrentAmount] = useState(Number(goal.currentAmount || 0));
  const [saveAmount, setSaveAmount] = useState(0);

  const target = Number(goal.targetAmount || 0);
  const percentage = target > 0 ? ((currentAmount / target) * 100).toFixed(1) : "0.0";

  const handleProgressUpdate = async () => {
    const newAmount = currentAmount + Number(saveAmount || 0);
    try {
      const res = await axios.patch(
        `/api/goals/${goal._id}`,
        { currentAmount: newAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentAmount(newAmount);
      setSaveAmount(0);
      onUpdate(res.data);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/goals/${goal._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(goal._id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h3 className="text-lg font-semibold mb-1">{goal.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        Target: ₹{target} | Deadline:{" "}
        {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : "N/A"}
      </p>

      <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mb-2">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${isNaN(percentage) ? 0 : percentage}%` }}
        ></div>
      </div>
      <p className="text-sm mb-2">
        Progress: ₹{currentAmount} ({isNaN(percentage) ? "0.0" : percentage}%)
      </p>

      <input
        type="number"
        placeholder="Add to savings"
        value={saveAmount}
        onChange={(e) => setSaveAmount(e.target.valueAsNumber || 0)}
        className="border p-2 rounded w-full mb-2"
        min="0"
      />

      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <button
          onClick={handleProgressUpdate}
          className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Add to Saved
        </button>
        <button
          onClick={handleDelete}
          className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
