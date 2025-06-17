import { useState } from "react";
import Papa from "papaparse";
import api from "../services/api";
import Layout from "../layouts/Layout";


export default function UploadCSV() {
  const [csvData, setCsvData] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data.map((row) => ({
          date: row["Date"] || new Date().toISOString().split("T")[0],
          type: row["Type"]?.toLowerCase() || "expense",
          category: row["Category"] || "Misc",
          amount: parseFloat(row["Amount"]) || 0,
          description: row["Description"] || "",
        }));
        setCsvData(data);
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/transactions/bulk", { transactions: csvData });
      setMessage("Transactions uploaded successfully!");
      setCsvData([]);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <Layout>
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Bank Statement</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {csvData.length > 0 && (
        <>
          <h3 className="text-lg font-semibold my-2">Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Type</th>
                  <th className="border px-2 py-1">Category</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Description</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{row.date}</td>
                    <td className="border px-2 py-1">{row.type}</td>
                    <td className="border px-2 py-1">{row.category}</td>
                    <td className="border px-2 py-1">₹{row.amount}</td>
                    <td className="border px-2 py-1">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save All Transactions
          </button>
        </>
      )}

      {message && <p className="mt-4 text-blue-600 font-semibold">{message}</p>}
    </div>
    </Layout>
  );
}
