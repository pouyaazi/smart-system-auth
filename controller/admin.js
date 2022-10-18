const Admin=require('../models/admin');
const response=require('./response');
const Role = require("../models/role");
module.exports = {
    getAllAdmin:(req,res,next)=>{
        Admin.find({}).exec((err, docs) => {
            res.locals.items = docs;
            response.ok(req, res, next,{});
        })
    },
    createAdmin:(req,res,next)=>{
        new Admin(req.body).save((err, doc) => {
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                res.locals.err=err;
                response.error(req, res, next,{});
            }
        })
    },
    getEachAdmin:(req,res,next)=>{
        Admin.findById(req.params.adminId).exec((err,doc)=>{
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{
                    err,
                });
            }
        })
    },
    updateEachAdminInfo:(req,res,next)=>{
        delete req.body['password']
        delete req.body['createdAt']
        delete req.body['updatedAt']
        delete req.body['isActive']
        delete req.body['isDelete']
        Admin.findByIdAndUpdate(req.params.adminId,req.body, {
            new: true,
            runValidators: true
        }).exec((err, doc) => {
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{
                    err,
                });
            }
        })
    },
    updateEachAdminStatus:(req,res,next)=>{
        Admin.findByIdAndUpdate(req.params.adminId, {
            isActive: req.body.status
        }, {
            new: true,
            runValidators: true
        }).exec((err, doc) => {
            if (doc) {
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{
                    err,
                });
            }
        })
    },
    updateEachAdminPassword:(req,res,next)=>{
        Admin.findByIdAndUpdate(req.params.adminId,{
            password:req.body.password,
        }, {
            new: true,
            runValidators: true
        }).exec((err, doc) => {
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                res.locals.err=err;
                response.error(req, res, next,{});
            }
        })
    },
    deleteEachAdmin:(req,res,next)=>{
        Admin.findByIdAndUpdate(req.params.adminId, {
            isDelete: true,
            isActive: false,
        }, {
            new: true,
            runValidators: true
        }).exec((err, doc) => {
            if (doc) {
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{
                    err,
                });
            }
        })
    }
}