import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ tasks, categories, onNavigate }) => {
  const done = tasks.filter((t) => t.completed).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const items = [
    { to: "/", label: "All tasks", icon: "bi-list-task", count: tasks.length, end: true },
    { to: "/active", label: "Active", icon: "bi-circle", count: tasks.length - done },
    { to: "/completed", label: "Completed", icon: "bi-check2-circle", count: done },
  ];

  return (
    <aside className="sidebar" id="app-sidebar">
      <div className="brand mb-4">
        <span className="brand-mark"><i className="bi bi-check2"></i></span>
        TaskManager
      </div>

      <button
        type="button"
        className="icon-btn sidebar-close d-lg-none"
        aria-label="Close sidebar"
        title="Close sidebar"
        onClick={onNavigate}
      >
        <i className="bi bi-x-lg" aria-hidden="true"></i>
      </button>

      <ul className="nav nav-pills flex-column gap-1">
        {items.map((i) => (
          <li className="nav-item" key={i.to}>
            <NavLink to={i.to} end={i.end} className="nav-link" onClick={onNavigate}>
              <span><i className={`bi ${i.icon} me-2`}></i>{i.label}</span>
              <span className="nav-count">{i.count}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-title">Categories</div>
      <ul className="list-unstyled mb-2">
        {categories.map((cat) => {
          const count = tasks.filter((t) => t.category === cat.name).length;
          return (
            <li key={cat.id} className="d-flex align-items-center justify-content-between px-2 py-1">
              <span className="d-flex align-items-center">
                <span className="pill-dot me-2" style={{ backgroundColor: cat.color }}></span>
                {cat.name}
              </span>
              <span className="text-muted small">{count}</span>
            </li>
          );
        })}
      </ul>
      <NavLink to="/categories" className="small text-decoration-none px-2" style={{ color: "var(--accent)" }} onClick={onNavigate}>
        <i className="bi bi-plus-lg me-1"></i>Manage categories
      </NavLink>

      <div className="sidebar-progress">
        <div className="d-flex justify-content-between small mb-2">
          <span className="fw-semibold">Progress</span>
          <span className="text-muted">{percent}%</span>
        </div>
        <div className="progress"><div className="progress-bar" style={{ width: `${percent}%` }}></div></div>
        <div className="text-muted small mt-2">{done} of {tasks.length} tasks done</div>
      </div>
    </aside>
  );
};

export default Sidebar;