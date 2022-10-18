require('dotenv').config()
const config = require("./config");
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URL;
mongoose.connect(DB_URI,config.MONGOOSE_CONNECT_OPTIONS);
const connection = mongoose.connection
module.exports = connection