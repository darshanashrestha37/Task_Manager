import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const colorOptions = ["#0d6efd", "#fd7e14", "#dc3545", "#6f42c1", "#198754", "#20c997"];

const Categories = () => {
  const { tasks, categories, onAddCategory, onDeleteCategory } = useOutletContext();
  const [name, setName] = useState("");
  const [color, setColor] = useState(colorOptions[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAddCategory({ id: Date.now(), name: name.trim(), color });
    setName("");
  };

  return (
    <div>
      <h3 className="mb-4">Categories</h3>

      {categories.length === 0 ? (
        <div className="empty-state mb-4">
          <i className="bi bi-tags"></i>
          No categories yet. Add one below to organize your tasks.
        </div>
      ) : (
        <ul className="list-group mb-4">
          {categories.map((cat) => {
            const count = tasks.filter((t) => t.category === cat.name).length;
            return (
              <li key={cat.id} className="list-group-item d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center">
                  <span className="pill-dot me-2" style={{ backgroundColor: cat.color, width: 10, height: 10 }}></span>
                  <span className="fw-medium">{cat.name}</span>
                  <span className="text-muted small ms-2">
                    {count} {count === 1 ? "task" : "tasks"}
                  </span>
                </span>
                <button className="icon-btn danger" aria-label={`Delete ${cat.name}`}
                  onClick={() => onDeleteCategory(cat.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <form className="cat-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="cat-name">New category</label>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input id="cat-name" type="text" className="form-control flex-grow-1" style={{ minWidth: 180, width: "auto" }}
            placeholder="e.g. Errands" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="swatches" role="radiogroup" aria-label="Color">
            {colorOptions.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={c}
                className={`swatch ${color === c ? "on" : ""}`} style={{ backgroundColor: c }}
                onClick={() => setColor(c)} />
            ))}
          </div>
          <button className="btn btn-primary" type="submit">Add category</button>
        </div>
      </form>
    </div>
  );
};

export default Categories;