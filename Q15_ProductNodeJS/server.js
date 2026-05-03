const express = require('express')
const fs = require('fs')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.static('public'));

//rote for reading the data

app.get("/api/products", (req, res) => {
    fs.readFile('product.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error is There " });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log("Server is listening");
});