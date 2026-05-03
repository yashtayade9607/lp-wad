import express from "express";
import mongoose from "mongoose";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors());

// // CORS
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Employee")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error:", err));

// Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joining_date: String,
});

// Model
const Employee = mongoose.model("employee_info", employeeSchema);


//  1. ADD Employee
app.post("/api/add", async (req, res) => {
    try {
        const newemployee = new Employee(req.body);
        await newemployee.save();
        res.json({ msg: "Employee Added" });
    } catch (err) {
        res.status(500).json({ error: "Add Failed" });
    }
});


// 2. DISPLAY Employees
app.get("/api/display", async (req, res) => {
    try {
        const data = await Employee.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Fetch Failed" });
    }
});

//  3. DELETE Employee (FIXED)
app.delete("/api/delete/:name", async (req, res) => {
    try {
        const delname = req.params.name;

        await Employee.deleteOne({ name: delname });

        res.json({ msg: "Employee Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete Failed" });
    }
});


//  4. UPDATE Employee (NEW)
app.put("/api/update/:name", async (req, res) => {
    try {
        const name = req.params.name;

        await Employee.updateOne(
            { name: name },
            { $set: req.body }   // update any field
        );

        res.json({ msg: "Employee Updated" });
    } catch (err) {
        res.status(500).json({ error: "Update Failed" });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});