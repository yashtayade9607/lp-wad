import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let tasks = [];

// GET all tasks
app.get("/alltask", (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/add", (req, res) => {
    const task = {
        id: Date.now(),
        des: req.body.text
    };
    tasks.push(task);
    res.json(task);
});

// UPDATE task
app.put("/update/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.map(t =>
        t.id === id ? { ...t, des: req.body.text } : t
    );

    res.json({ msg: "Updated" });
});

// DELETE task
app.delete("/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(t => t.id !== id);

    res.json({ msg: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});