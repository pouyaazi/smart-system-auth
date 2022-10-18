const mongoose = require("mongoose");
const config = require("../config");
let schema = new mongoose.Schema({
        token: {
            type: String,
            unique: true,
        },
        socketId: String,
        notification: String,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        ...config.MONGOOSE_MODEL_OPTIONS,
        ...{
            discriminatorKey: 'class',
        }
    }
);
let Token = mongoose.model("token", schema);


let adminTokenSchema = new mongoose.Schema({
    adminId: {
        type: config.ObjectId,
        ref: "admin",
        autopopulate: true
    },
}, {
    ...config.MONGOOSE_MODEL_OPTIONS,
    ...{
        discriminatorKey: 'class',
    }
})
let AdminToken = Token.discriminator('adminToken', adminTokenSchema);


module.exports = {
    AdminToken
};