import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const navItems = [
    { to: "/", label: "Home", end: true },
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
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
