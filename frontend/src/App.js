import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <h1>Task Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
