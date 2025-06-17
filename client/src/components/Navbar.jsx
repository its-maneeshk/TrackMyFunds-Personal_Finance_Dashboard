import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await logout();
      navigate("/login"); // Redirect to login or any route
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="text-xl font-bold mb-2 sm:mb-0">Finance Dashboard</div>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-sm">
            👋 Hello, <span className="font-semibold">{user.name}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-3 py-1 rounded transition ${
            loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {error && (
        <div className="text-red-400 mt-2 text-sm">{error}</div>
      )}
    </nav>
  );
}
