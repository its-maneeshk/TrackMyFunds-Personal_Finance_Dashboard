import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function IncomeExpenseLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/transactions");

        const grouped = res.data.reduce((acc, txn) => {
          const date = txn.date.slice(0, 7); // YYYY-MM
          if (!acc[date]) acc[date] = { month: date, income: 0, expense: 0 };
          acc[date][txn.type] += Number(txn.amount);
          return acc;
        }, {});

        const chartData = Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded mt-6">
      <h3 className="text-lg font-semibold mb-2">Income vs Expense (Monthly)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
          <Line type="monotone" dataKey="expense" stroke="#ff7f7f" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
