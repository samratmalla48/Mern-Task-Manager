import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(null);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task name cannot be empty!");
      return;
    }

    try {
      const response = await axiosInstance.post("/tasks", { name: taskName });
      setTasks([...tasks, response.data]);
      setTaskName("");
      setError(null);
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  // Toggle Task Status
  const toggleTaskStatus = async (id, completed) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, {
        completed: !completed,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task Manager</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="d-flex mb-4" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <span>
              {task.name} - {task.completed ? "Completed" : "Not Completed"}
            </span>
            <div>
              <button
                onClick={() => toggleTaskStatus(task._id, task.completed)}
                className="btn btn-sm btn-warning me-2"
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
