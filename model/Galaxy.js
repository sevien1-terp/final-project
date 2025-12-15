const mongoose = require("mongoose");

const galaxySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   }
});

const Galaxy = mongoose.model("Galaxy", galaxySchema);
module.exports = Galaxy;

