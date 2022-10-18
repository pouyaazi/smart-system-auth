require('dotenv').config()
const mongoose = require("mongoose");
const config = require("../config");

let schema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password:String,
        firstName:String,
        lastName:String,
        birthDate:Date,
        role:{
            type: config.ObjectId,
            ref: "role",
            //autopopulate: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
    },
    config.MONGOOSE_MODEL_OPTIONS
);
schema.plugin(require("mongoose-bcrypt"));

let Admin = mongoose.model("admin", schema);
module.exports = Admin