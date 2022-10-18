require('dotenv').config()
const mongoose = require("mongoose");
const config = require("../config");
let schema = new mongoose.Schema({
        title:String,
    },
    config.MONGOOSE_MODEL_OPTIONS
);
let Role = mongoose.model("role", schema);
module.exports = Role