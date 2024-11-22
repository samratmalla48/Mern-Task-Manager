const express = require("express");
const router = express.Router();
const {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

// Define routes
router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
