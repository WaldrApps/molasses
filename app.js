const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const app = express();
const port = 3002

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public', 'train.html'));
});

app.post('/saveImage', (req,res) => {
    let base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("images/" + req.body.label + "_" + uuidv4() + ".png", base64Data, "base64", (err) => {
        if(err) {
            console.log(err);
        }
    });
});

const server = app.listen(port, () => {});
