import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../../services/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#00C49F"];

export default function ExpensePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/transactions");
        const expenses = res.data.filter(t => t.type === "expense");

        const grouped = expenses.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
          return acc;
        }, {});

        const chartData = Object.entries(grouped).map(([key, value]) => ({
          name: key,
          value,
        }));

        setData(chartData);
      } catch (err) {
        console.error("Error loading chart data:", err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Expenses by Category</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
