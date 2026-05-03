const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/student")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Connection Error:", err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_no: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

// Model
const Student = mongoose.model("studentmarks", studentSchema);


// ================== ROUTES ================== //

app.get("/insert", async (req, res) => {
    const data = [

        // ✔ High scorer (for all25)
        { Name: "Samarth Chaugule", Roll_no: 33309, WAD_Marks: 95, CC_Marks: 92, DSBDA_Marks: 96, CNS_Marks: 94, AI_Marks: 93 },

        // ✔ DSBDA > 20 but not all >25
        { Name: "Ramu", Roll_no: 33310, WAD_Marks: 18, CC_Marks: 22, DSBDA_Marks: 30, CNS_Marks: 19, AI_Marks: 21 },

        // ✔ All >25
        { Name: "Yash Tyade", Roll_no: 33311, WAD_Marks: 40, CC_Marks: 45, DSBDA_Marks: 50, CNS_Marks: 42, AI_Marks: 38 },

        // ✔ Less than 40 in WAD & CC
        { Name: "Abhishake Chaugule", Roll_no: 33312, WAD_Marks: 35, CC_Marks: 30, DSBDA_Marks: 60, CNS_Marks: 55, AI_Marks: 65 },

        // ✔ Mixed case (for testing)
        { Name: "Neha", Roll_no: 33313, WAD_Marks: 26, CC_Marks: 27, DSBDA_Marks: 28, CNS_Marks: 29, AI_Marks: 24 }

    ];

    await Student.insertMany(data);
    res.send("Sample Students Inserted Successfully");
});

// d) Display all students + count (in browser)
app.get("/display", async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.render("index", { students, count });
});


// e) Students with DSBDA > 20
app.get("/dsbda20", async (req, res) => {
    const result = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.render("index", { students: result, count: result.length });
});


// f) Update marks by 10 (by name)
app.get("/update/:name", async (req, res) => {
    const result = await Student.updateOne(
        { Name: req.params.name },
        { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10 } }
    );

    res.send(result);
});
// g) Students with >25 in ALL subjects
app.get("/all25", async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    });

    res.render("index", { students: result, count: result.length });
});


// h) Students with <40 in WAD & CC
app.get("/less40", async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $lt: 40 },
        CC_Marks: { $lt: 40 }
    });

    res.render("index", { students: result, count: result.length });
});


// i) Delete student by name
app.get("/delete/:name", async (req, res) => {
    const result = await Student.deleteOne({ Name: req.params.name });
    res.send(result);
});
// Server Start
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});