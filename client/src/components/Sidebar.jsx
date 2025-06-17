import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItemClass =
    'block px-4 py-2 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors';

  const activeClass = 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r">
      <div className="bg-gray-800 p-6 text-center border-b">
        <h1 className="text-2xl font-bold text-white">Finance Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ''}`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ''}`
              }
            >
              Add Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ''}`
              }
            >
              Upload CSV
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ''}`
              }
            >
              Savings Goals
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
