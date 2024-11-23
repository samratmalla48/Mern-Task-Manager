import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
