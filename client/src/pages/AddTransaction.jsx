import { useState } from "react";
import api from "../services/api";
import Layout from "../layouts/Layout";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/transactions", form);
      setMessage("Transaction added successfully!");
      setForm({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setMessage("Error adding transaction.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Food, Salary"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Note</label>
            <input
              type="text"
              name="note"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </Layout>
  );
}
