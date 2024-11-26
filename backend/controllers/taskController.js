const Task = require("../models/Task");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Task name is required" });
    }

    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
      const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation is applied
      });

      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(task);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
      const task = await Task.findByIdAndDelete(id);

      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
