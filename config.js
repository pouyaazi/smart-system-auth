var mongoose = require("mongoose");
module.exports = {
    MONGOOSE_MODEL_OPTIONS: {
        toObject: {
            getters: true,
            virtuals: true,
        },
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    },
    MONGOOSE_CONNECT_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    },
    MONGOOSE_UPDATE_OPTIONS: {
        new: true,
        runValidators: true,
    },
    ObjectId: mongoose.Schema.Types.ObjectId,
    ObjectIdConvertor: mongoose.Types.ObjectId,
};