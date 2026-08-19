import { useEffect, useState } from "react";
import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/timer", label: "Timer", end: false },
    { to: "/debounce", label: "Debounce", end: false },
    { to: "/throttle-scroll", label: "Throttle Scroll", end: false },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">L</div>
          <div>
            <p className="eyebrow">Studio</p>
            <h2>LifeCycle Lab</h2>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
