import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardCards() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSaved: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const incomeRes = await api.get("/transactions?type=income");
        const expenseRes = await api.get("/transactions?type=expense");
        const goalsRes = await api.get("/goals");

        const totalIncome = incomeRes.data.reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = expenseRes.data.reduce((sum, t) => sum + t.amount, 0);
        const totalSaved = goalsRes.data.reduce((sum, g) => sum + g.savedAmount, 0);

        setSummary({ totalIncome, totalExpenses, totalSaved });
      } catch (err) {
        console.error("Error loading dashboard summary", err);
      }
    };

    fetchSummary();
  }, []);

  const netBalance = summary.totalIncome - summary.totalExpenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Income" amount={summary.totalIncome} color="green" />
      <Card title="Total Expenses" amount={summary.totalExpenses} color="red" />
      <Card title="Net Balance" amount={netBalance} color={netBalance >= 0 ? "blue" : "orange"} />
      <Card title="Total Saved" amount={summary.totalSaved} color="purple" />
    </div>
  );
}

function Card({ title, amount, color }) {
  const colors = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${colors[color]} font-semibold`}>
      <h4 className="text-sm">{title}</h4>
      <p className="text-xl mt-2">₹ {amount.toLocaleString()}</p>
    </div>
  );
}
