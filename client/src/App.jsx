import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import UploadCSV from './pages/UploadCSV';
import PrivateRoute from './components/PrivateRoute';
import SavingsGoals from './pages/SavingsGoals';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
      <Route path="/upload" element={<PrivateRoute><UploadCSV /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/goals" element={<PrivateRoute><SavingsGoals /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
