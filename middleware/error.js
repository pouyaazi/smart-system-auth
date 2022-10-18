const { validationResult } = require('express-validator');
var exports = module.exports = {};
exports.checkBody = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        next();
    }
}