require('dotenv').config()
const mongoose = require("mongoose");
const config = require("../config");
let schema = new mongoose.Schema({
        title:{
            type: String,
            required: true,
            unique: true,
        },
    },
    config.MONGOOSE_MODEL_OPTIONS
);
let Role = mongoose.model("role", schema);
module.exports = Role