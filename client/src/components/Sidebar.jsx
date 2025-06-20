import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass =
    'block px-4 py-2 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors';
  const activeClass = 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <div className="relative">
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-slate-200 shadow-lg border-r z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64`}
      >
        <div className="bg-gray-800 p-6 text-center border-b">
          <h1 className="text-lg font-bold text-white">Finance Dashboard</h1>
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
                onClick={() => setIsOpen(false)} // close on nav click
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
              >
                Savings Goals
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
