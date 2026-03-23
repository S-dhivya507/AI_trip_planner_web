import { Link, NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg className="brand-logo" viewBox="0 0 48 48" role="img">
              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="18" fill="url(#brandGradient)" opacity="0.18" />
              <circle cx="24" cy="24" r="15" fill="none" stroke="url(#brandGradient)" strokeWidth="2" />
              <path
                d="M24 12 L28.5 23.5 L24 36 L19.5 23.5 Z"
                fill="url(#brandGradient)"
              />
              <circle cx="24" cy="24" r="3.4" fill="#111827" />
            </svg>
          </span>
          <span className="brand-text">Trip Planner</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/trip" className="nav-link">
            Trip Overview
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Smart, AI-powered itineraries for stress-free travel.</p>
        <p className="footer-meta">Built with React </p>
      </footer>
    </div>
  );
};

export default Layout;
