const express = require('express');
const router = express.Router();
const Galaxy = require("../models/Galaxy");

router.post("/displayStatistics", async (req, res) => {
    try {
        let { name } = req.body;
        name = name.toLowerCase().trim();
        if (name.startsWith("the")) {
            name = name.slice(4).trim();
        }
        if (name.endsWith("galaxy")) {
            name = name.slice(0, -7).trim();
        }

        const count = await Galaxy.countDocuments({ name: name });

        await Galaxy.create({ name: name });

        res.render("displayStatistics", { stats: count, name: name });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error processing request");
    }
});

router.get("/", (req, res) => {
  res.render(`favoriteGalaxy`);
});


module.exports = router;

