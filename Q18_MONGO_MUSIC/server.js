const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")
const path = require("path")
// Songname, Film, Music_director, singer
app = express();

app.use(express.json());
// Middleware
app.use(express.urlencoded({ extended:true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
const cors = require("cors");
app.use(cors());
// b) Create a collection called song details 
const songSchema = new mongoose.Schema({
    songName: String,
    filmName: String,
    Director: String,
    singer: String,
    actor: String,
    actress : String 
});
const Song = mongoose.model("Song", songSchema);

// a) Create a Database called music.
// connect t to mongodb 
mongoose.connect("mongodb://127.0.0.1:27017/Music11")
    .then(() => console.log("mongodb connnected"))
    .catch((err) => console.log("Mongo Db is Not Connected !!!!"));
// c) Insert array of 5 song documents in above Collection. 
app.get("/insert", async  (req, res) => {
    await Song.insertMany([
        { songName: "Tuje Hasil karunga", filmName: "Hacker2", Director: "Aditya Daru", singer: "Arjit Singh" },
        { songName: "Tum Hi Ho", filmName: "Aashiqui 2", Director: "Mithoon", singer: "Arijit Singh" },
        { songName: "Malang", filmName: "Dhoom 3", Director: "Pritam", singer: "Siddharth Mahadevan" },
        { songName: "Kal Ho Na Ho", filmName: "KHNH", Director: "Shankar", singer: "Sonu Nigam" },
        { songName: "Channa Mereya", filmName: "ADHM", Director: "Pritam", singer: "Arijit Singh" }
    ]);
    res.send("5 music Added in the Database ");
});
app.get("/", async (req, res) => {
    const songs = await Song.find();
    res.render('index', { songs: songs }); 
});

//server

// D) Display total count of documents and List all the documents in browser.
app.get("/all", async (req, res) => {
    const songs = await Song.find();
    res.send({ data: songs, total :songs.length });
});
// e) List specified Music Director songs.
app.get("/music/:director", async (req, res) => {
    const data = await Song.find({ Director: req.params.director });
    console.log("Director Songs : " + data);
    res.send(data);
});
// f) List specified Music Director songs sung by specified Singer 
app.get("/filter",async (req, res) => {
    const { director, singer } = req.query;
    const data = await Song.find({ Director: director, singer: singer });
    res.send(data);
});
// g) Delete the song which you don’t like.

app.post("/delete", async (req, res) => {
    await Song.deleteOne({ songName: req.body.songname });
    const songs = await Song.find();
    res.render('index', { songs: songs });
});

// h) Add new song which is your favourite.
app.post("/add", async(req, res) => {
    const newsong = new Song(req.body);
    await newsong.save();
    res.send("Song Addeed Successfully ");
});
// i) List Songs sung by Specified Singer from specified film.
app.get("/search", async (req, res) => {
    const { film, singer } = req.query;
    const data = await Song.find({ filmName: film, singer: singer });
    res.send(data);
});
// j) Update the document by adding Actor and Actress name.
app.get("/update/:name", async(req, res) => {
    await Song.updateOne({ songName: req.params.name }, { actress: "Shrileala", actor: "Ranvir Singh" });
    res.send("Updated Successfully ");
});
app.listen(3000, () => {
    console.log("Server is Listening !!!!!");
});

