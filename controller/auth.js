const Admin=require('../models/admin');
const AdminToken=require('../models/token').AdminToken;
const response=require('../controller/response');
var rand = require("random-key");
module.exports = {
    auth:(req,res,next)=>{
        Admin.findOne({
            username: req.body.username,
            isActive: true,
        }, async function (err, admin) {
            if (err) throw err;
            if (!admin) {
                response.error(req, res, next,{})
            } else {
                if (admin.verifyPasswordSync(req.body.password)) {
                    let token = await new AdminToken({
                        token: rand.generateBase30(512),
                        adminId:admin._id
                    }).save();
                    res.locals.token = token.token;
                    response.ok(req,res,next,{});
                } else {
                    response.error(req, res, next,{})
                }
            }
        });
    }
}