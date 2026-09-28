import React from "react";
import { useOutletContext } from "react-router-dom";
import TaskList from "../components/TaskList";

const Completed = () => {
  const { tasks, categories, searchTerm, onSearchChange, onAddTask, onToggle, onEdit, onDelete } =
    useOutletContext();

  const filteredTasks = tasks.filter(
    (task) =>
      task.completed &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="mb-0">Completed Tasks</h3>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input
            type="search"
            className="form-control"
            style={{ maxWidth: "260px" }}
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <button className="btn btn-primary text-nowrap" onClick={onAddTask}>
            <i className="bi bi-plus-lg me-1"></i>
            Add task
          </button>
        </div>
      </div>
      <TaskList
        tasks={filteredTasks}
        categories={categories}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Completed;