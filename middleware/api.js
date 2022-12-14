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
    isExistAdmin: (req, res, next) => {
        if (res.locals.adminInfo) {
            next();
        } else {
            response.error(req, res, next, {
                messages:['این کاربر در پایگاه داده وجود ندارد']
            })
        }
    },
    isActiveAdmin: (req, res, next) => {
        Admin
            .findById(res.locals.adminInfo._id, '-password')
            .populate('roleId')
            .exec((err, doc) => {
                if (doc.isActive == true) {
                    res.locals.adminInfo = doc;
                    next();
                } else {
                    response.error(req, res, next, {
                        messages:['کاربر غیر فعال است']
                    })
                }
            })
    },
    isDeleteAdmin: (req, res, next) => {
        if (res.locals.adminInfo.isDelete == false) {
            next();
        } else {
            response.error(req, res, next, {
                messages:['کاربر حذف شده است']
            })
        }
    },
    isSuperAdmin:(req,res,next)=>{
        if (res.locals.adminInfo.roleId.title == 'admin') {
            next();
        } else {
            response.error(req, res, next, {
                messages:['برای دسترسی به این بخش باید سوپر ادمین باشید']
            })
        }
    },
    isSupportUser:(req,res,next)=>{
        if (res.locals.adminInfo.roleId.title == 'support-user') {
            next();
        } else {
            response.error(req, res, next, {
                messages:['برای دسترسی به این بخش باید پشتیبانی باشید']
            })
        }
    }
}