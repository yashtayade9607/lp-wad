import express from "express"
import mongoose, { mongo } from "mongoose"
import cors from "cors"
const app = express()

// CORS middleware MUST be first

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     if (req.method === "OPTIONS") return res.sendStatus(200);
//     next();
// });

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BookInfo")
    .then(() => console.log("Mongo Connected !!!"))
    .catch((err) => console.log("Connection Error "));

const bookSchema = new mongoose.Schema(
    {
        // (title, author, price, genre)
        title: String,
        author: String,
        price: Number,
        genre: String
    }
);

const Book = mongoose.model("Book", bookSchema);
// 1)  adding the data 
app.post("/api/add", async (req, res) => {
    try {
      
        const newdata = new Book(req.body);
        await newdata.save();
        res.json({ msg: "New Book Added " });
    }
    catch (err) {
        res.status(500).json({ error: "Error during Save" });
    }
});
// 2)  View the All Data 
app.get("/api/view", async (req, res) => {
    try {
        const data = await Book.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Cannot Able to View the data" });
    }
});
// 3) update the book data (according to the title)
app.put("/api/update/:title", async (req, res) => {
    try {
        const title = req.params.title;
        await Book.updateOne(
            { title: title },
            { $set: req.body }
        );
        res.json({msg:"Book Record Updated !!!"});
    } catch (err)
    {
        res.status(500).json({ error: "Cannot able to Update!!" });
    }
});
// 4) Delete the book record 
app.delete("/api/delete/:title", async (req, res) => {
    try {
        const name = req.params.title;
        await Book.deleteOne({ title: name });
        res.json({ msg: "Book Record Deleted " });
    }
    catch (err) {
        res.status(500).json({ error: "cannot able to Delete the record " });
    }
});

app.listen(3000, () => {
    console.log("Server is Active!!!");
});