require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7003;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error(err));

const spaceRoutes = require("./routes/spaceRoutes");

app.use("/favoriteGalaxy", spaceRoutes);

app.get("/", async (req, res) => {
    // Get random image from the api to display
    const response = await fetch("https://api.spacexdata.com/v5/launches");
    const data = await response.json();
    let img, name;
    const list = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].links?.flickr?.original?.length > 0) {
            list.push(data[i]);
        }
    }

    if (list.length > 0) {
        const num = Math.floor(Math.random() * list.length);
        img = list[num].links.flickr.original[0];
        name = list[num].name;
    }

    res.render(`home`, { image: img, name: name });
});

app.listen(portNumber);
console.log(`main URL http://localhost:${portNumber}/`);
