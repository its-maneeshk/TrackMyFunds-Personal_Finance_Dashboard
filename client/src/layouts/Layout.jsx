// src/layouts/Layout.jsx
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar />
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
