require('dotenv').config()
const mongoose = require("mongoose");
const config = require("../config");

let schema = new mongoose.Schema({
        adminId:{
            type: config.ObjectId,
            ref: "admin",
            //autopopulate: true
        },
        title:String,
        caption:String,
        price:{
            type:Number,
            default:0,
            min:0,
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
let Product = mongoose.model("product", schema);
module.exports = Product