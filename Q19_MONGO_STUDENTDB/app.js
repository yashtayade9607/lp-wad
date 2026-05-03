import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(express.static("public"));
app.use(express.json());

// CORS (for fetch from 5500)
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     next();
// });

app.use(cors());

// MongoDB Connection (UNCHANGED)
mongoose.connect("mongodb://127.0.0.1:27017/studentData")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error", err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

// Collection (UNCHANGED)
const Student = mongoose.model("Student_Marks", studentSchema);

// Sample Data
const data = [
    { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
    { Name: "XYZ", Roll_No: 112, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 22, CNS_Marks: 26, AI_Marks: 27 },
    { Name: "PQR", Roll_No: 113, WAD_Marks: 18, CC_Marks: 20, DSBDA_Marks: 15, CNS_Marks: 19, AI_Marks: 17 },
    { Name: "LMN", Roll_No: 114, WAD_Marks: 40, CC_Marks: 42, DSBDA_Marks: 38, CNS_Marks: 41, AI_Marks: 39 },
    { Name: "DEF", Roll_No: 115, WAD_Marks: 27, CC_Marks: 29, DSBDA_Marks: 30, CNS_Marks: 28, AI_Marks: 26 },
    { Name: "GHI", Roll_No: 116, WAD_Marks: 10, CC_Marks: 12, DSBDA_Marks: 8, CNS_Marks: 15, AI_Marks: 9 },
    { Name: "JKL", Roll_No: 117, WAD_Marks: 35, CC_Marks: 33, DSBDA_Marks: 36, CNS_Marks: 34, AI_Marks: 32 }
];

//  Insert data (run once)
app.get("/api/insert", async (req, res) => {
    const result = await Student.insertMany(data);
    res.json(result);
});

//  Display all (d, j)
app.get("/api/display", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

//  DSBDA > 20 (e)
app.get("/api/dsbda20", async (req, res) => {
    const result = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.json(result);
});

//  All subjects > 25 (g)
app.get("/api/all25", async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    });
    res.json(result);
});

// Less than 40 in WAD & CC (h)
app.get("/api/wadcc", async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $lt: 40 },
        CC_Marks: { $lt: 40 }
    });
    res.json(result);
});

//  Update +10 marks (f)
app.put("/api/update/:name", async (req, res) => {
    const name = req.params.name;

    await Student.updateOne(
        { Name: name },
        {
            $inc: {
                WAD_Marks: 10,
                CC_Marks: 10,
                DSBDA_Marks: 10,
                CNS_Marks: 10,
                AI_Marks: 10
            }
        }
    );
    res.json({ message: "Marks updated by +10" });
});

// Delete (i)
app.delete("/api/delete/:name", async (req, res) => {
    const name = req.params.name;

    await Student.deleteOne({ Name: name });

    res.json({ message: "Student deleted successfully" });
});
// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
