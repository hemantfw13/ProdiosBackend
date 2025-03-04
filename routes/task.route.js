const express = require("express");
const TaskModel = require("../models/Task.model");
const taskRouter = express.Router();
const bcrypt = require("bcrypt");

taskRouter.get("/", async (req, res) => {
    const tasks = await TaskModel.find();
    res.json(tasks);
});

taskRouter.post("/", async (req, res) => {
    const task = await TaskModel.create({ ...req.body });
    res.status(201).json(task);
});

taskRouter.put("/:id", async (req, res) => {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

taskRouter.delete("/:id", async (req, res) => {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = { taskRouter };
