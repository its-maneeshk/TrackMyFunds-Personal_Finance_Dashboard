import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../layouts/Layout";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
  });
  const [localAmounts, setLocalAmounts] = useState({});

  const fetchGoals = async () => {
    const res = await api.get("/goals");
    setGoals(res.data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/goals", { ...form, savedAmount: 0 });
    setForm({ title: "", targetAmount: "", deadline: "" });
    fetchGoals();
  };

  const updateSaved = async (id, newAmount) => {
    await api.patch(`/goals/${id}`, { savedAmount: newAmount });
    fetchGoals();
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Goal Name"
            onChange={handleChange}
            value={form.title}
            className="border p-2 w-full"
            required
          />
          <input
            name="targetAmount"
            type="number"
            placeholder="Target Amount"
            onChange={handleChange}
            value={form.targetAmount}
            className="border p-2 w-full"
            required
          />
          <input
            name="deadline"
            type="date"
            onChange={handleChange}
            value={form.deadline}
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Goal
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {goals.map((goal) => {
            const progress = Math.min(
              (goal.savedAmount / goal.targetAmount) * 100 || 0,
              100
            );

            return (
              <div
                key={goal._id}
                className="border p-4 rounded shadow bg-white"
              >
                <h3 className="text-lg font-semibold">{goal.title}</h3>
                <p>Target: ₹{goal.targetAmount}</p>
                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>

                <div className="mt-2 bg-gray-200 rounded-full overflow-hidden h-4">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">
                  Saved: ₹{goal.savedAmount} ({Math.round(progress)}%)
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Add ₹"
                    value={localAmounts[goal._id] || ""}
                    onChange={(e) =>
                      setLocalAmounts({
                        ...localAmounts,
                        [goal._id]: e.target.value,
                      })
                    }
                    className="border p-1 w-32"
                  />
                  <button
                    onClick={async () => {
                      const inputVal = parseFloat(localAmounts[goal._id]);
                      if (!isNaN(inputVal) && inputVal > 0) {
                        const newTotal = goal.savedAmount + inputVal;
                        await updateSaved(goal._id, newTotal);
                        setLocalAmounts({
                          ...localAmounts,
                          [goal._id]: "",
                        });
                      }
                    }}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
