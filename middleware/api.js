const response = require("../controller/response");
const Admin= require("../models/admin");
const AdminToken = require("../models/token").AdminToken;
const { validationResult } = require('express-validator');


module.exports = {
    checkBody:(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            response.error(req, res, next, {
                messages:['مشکل در ورودی ها'],
                err:{
                    erros:errors.array()
                }
            })
        }else{
            next();
        }
    },
    isExistToken: (req, res, next) => {
        AdminToken.findOne({
            token: req.headers['x-api-key']
        }).populate('adminId', '-password').exec(async (err, doc) => {
            if (doc) {
                res.locals.adminInfo = doc.adminId;
                next();
            } else {
                response.error(req, res, next, {
                    messages:['این توکن وجود ندارد']
                })
            }
        })
    },
    isExistUser: (req, res, next) => {
        if (res.locals.adminInfo) {
            next();
        } else {
            response.error(req, res, next, {
                messages:['این کاربر در پایگاه داده وجود ندارد']
            })
        }
    },
    isActiveUser: (req, res, next) => {
        Admin
            .findById(res.locals.adminInfo._id, '-password')
            .exec((err, doc) => {
                if (doc.isActive == true) {
                    res.locals.adminInfo = doc.adminId;
                    next();
                } else {
                    response.error(req, res, next, {
                        messages:['کاربر غیر فعال است']
                    })
                }
            })
    },
    isDeleteUser: (req, res, next) => {
        if (res.locals.user.isDelete == false) {
            next();
        } else {
            response.error(req, res, next, {
                messages:['کاربر حذف شده است']
            })
        }
    }
}