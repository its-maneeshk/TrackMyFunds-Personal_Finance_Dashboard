import { useEffect, useState } from "react";
import api from "../services/api";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((txn, index) => (
              <tr key={index} className="text-sm text-center">
                <td className="px-4 py-2 border">{txn.date?.slice(0, 10)}</td>
                <td className={`px-4 py-2 border ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {txn.type}
                </td>
                <td className="px-4 py-2 border">{txn.category}</td>
                <td className="px-4 py-2 border">₹{txn.amount}</td>
                <td className="px-4 py-2 border">{txn.note || txn.title || "No description"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
