const express = require('express')
const fs = require('fs')
const cors = require('cors');
// const { error } = require('console');

const app = express()

app.use(express.static('public'));

app.use(cors());

app.get("/api/user", (req, res) => {
    fs.readFile('user.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "error are there " });

        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log("Server is Listening !!!!");
});