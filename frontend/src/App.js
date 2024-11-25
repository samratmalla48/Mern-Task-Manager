import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // Handle form submission
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskName) {
      setError("Task name cannot be empty!");
      return;
    }

    try {
      const response = await axiosInstance.post("/tasks", {
        name: taskName,
      });
      setTasks([...tasks, response.data]); // Add the new task to the list
      setTaskName(""); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Failed to add task. Please try again later.");
      console.error("Error adding task:", err);
    }
  };

  // Handle task completion toggle
  const toggleTaskStatus = async (id, completed) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, {
        completed: !completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task status. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task Form */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.completed ? "Completed" : "Not Completed"}
            <button onClick={() => toggleTaskStatus(task._id, task.completed)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
