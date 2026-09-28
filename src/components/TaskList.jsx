import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, categories, onToggle, onEdit, onDelete }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <p className="stat-value">{total}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <p className="stat-value text-success">{completed}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <span className="stat-label">Remaining</span>
            <p className="stat-value">{remaining}</p>
            <div className="progress mt-2">
              <div
                className="progress-bar"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="empty-state">
          <i className="bi bi-inbox"></i>
          No tasks here yet. Use “Add task” to create one.
        </div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              categories={categories}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
