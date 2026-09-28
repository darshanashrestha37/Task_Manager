import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddTaskModal from "../components/AddTaskModel";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultCategories = [
  { id: 1, name: "Personal", color: "#76aaf7" },
  { id: 2, name: "Work", color: "#73f3b7" },
];

const Layout = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [categories, setCategories] = useLocalStorage(
    "categories",
    defaultCategories
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 992
  );

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSaveTask = (task) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => t.id === task.id);
      if (exists) {
        return prevTasks.map((t) => (t.id === task.id ? task : t));
      }
      return [...prevTasks, task];
    });
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const handleAddCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className={`d-flex app-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar
        tasks={tasks}
        categories={categories}
        onNavigate={closeSidebar}
      />

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      <div className="flex-grow-1">
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

        <div className="container-fluid p-4">
          <Outlet
            context={{
              tasks,
              categories,
              searchTerm,
              onSearchChange: setSearchTerm,
              onToggle: handleToggle,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onAddCategory: handleAddCategory,
              onDeleteCategory: handleDeleteCategory,
              onAddTask: openAddModal,
            }}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddTaskModal
          categories={categories}
          taskToEdit={taskToEdit}
          onSave={handleSaveTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Layout;
