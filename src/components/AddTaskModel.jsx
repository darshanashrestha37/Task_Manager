import React, { useState, useEffect } from "react";

const priorities = ["Low", "Medium", "High"];

const AddTaskModal = ({ categories, taskToEdit, onSave, onClose }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [category, setCategory] = useState(
    taskToEdit ? taskToEdit.category : categories[0] ? categories[0].name : ""
  );
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : "");
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "Medium");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title: title.trim(),
      category,
      dueDate,
      priority,
      completed: taskToEdit ? taskToEdit.completed : false,
    });
  };

  return (
    <div
      className="modal d-block modal-backdrop-custom"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{taskToEdit ? "Edit task" : "New task"}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label" htmlFor="task-title">Title</label>
                <input
                  id="task-title"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to get done?"
                  autoFocus
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="task-cat">Category</label>
                  <select id="task-cat" className="form-select" value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="task-due">Due date</label>
                  <input id="task-due" type="date" className="form-control" value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="form-label">Priority</label>
                <div className="segmented" role="group">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={priority === p}
                      className={`${p.toLowerCase()} ${priority === p ? "on" : ""}`}
                      onClick={() => setPriority(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                {taskToEdit ? "Save changes" : "Add task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;