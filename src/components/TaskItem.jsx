import React from "react";

const TaskItem = ({ task, categories, onToggle, onEdit, onDelete }) => {
  const category = categories.find((c) => c.name === task.category);
  const p = (task.priority || "").toLowerCase();
  const priorityClass = ["high", "medium", "low"].includes(p) ? `priority-${p}` : "priority-other";

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between flex-wrap gap-2">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input me-3"
          aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "completed"}`}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "text-decoration-line-through text-muted" : "fw-medium"}>
          {task.title}
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        {category && (
          <span className="pill" style={{ backgroundColor: `${category.color}26`, color: "var(--ink)" }}>
            <span className="pill-dot" style={{ backgroundColor: category.color }}></span>
            {category.name}
          </span>
        )}
        {task.priority && <span className={`pill ${priorityClass}`}>{task.priority}</span>}
        {task.dueDate && (
          <span className="text-muted small d-inline-flex align-items-center gap-1">
            <i className="bi bi-calendar3"></i>{task.dueDate}
          </span>
        )}

        <div className="task-actions d-flex">
          <button className="icon-btn" aria-label="Edit task" onClick={() => onEdit(task)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="icon-btn danger" aria-label="Delete task" onClick={() => onDelete(task.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;