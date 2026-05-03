const express = require("express")
const fs = require("fs")
const cors = require('cors')
const app = express()

app.use(express.static('public'));
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
// });

//api 
app.get("/api/employee", (req, res) => {
    fs.readFile("employee.json", 'utf-8', (err, data) => {
        
        if (err)
        {
         return  res.status(500).json({ error: "Error Found " });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log("Server is listening");
});