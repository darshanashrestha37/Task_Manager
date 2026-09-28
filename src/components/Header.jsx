import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "All", end: true },
  { to: "/active", label: "Active" },
  { to: "/completed", label: "Completed" },
  { to: "/categories", label: "Categories" },
];

const Header = ({ sidebarOpen, onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
  const menuLabel = sidebarOpen ? "Close sidebar" : "Open sidebar";

  return (
    <header className="topbar">
      <button
        type="button"
        className="btn menu-toggle"
        onClick={onToggleSidebar}
        aria-label={menuLabel}
        aria-expanded={sidebarOpen}
        aria-controls="app-sidebar"
        title={menuLabel}
      >
        <i
          className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`}
          aria-hidden="true"
        ></i>
        <span className="visually-hidden">{menuLabel}</span>
      </button>

      <div className="brand-mobile">
        <span className="brand-mark"><i className="bi bi-check2"></i></span>
        TaskManager
      </div>

      <nav className="topbar-nav" aria-label="Sections">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) => (isActive ? "active" : "")}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="topbar-actions ms-auto">
        <button
          type="button"
          className="btn theme-toggle"
          onClick={toggleTheme}
          aria-label={themeLabel}
          aria-pressed={isDark}
          title={themeLabel}
        >
          <i className={`bi ${isDark ? "bi-sun" : "bi-moon"}`} aria-hidden="true"></i>
          <span className="visually-hidden">{isDark ? "Light mode active" : "Dark mode active"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
