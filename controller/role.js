const Role=require('../models/role');
const response=require('./response');
module.exports = {
    getAllRole:(req,res,next)=>{
        Role.find({}).exec((err, docs) => {
            if (docs) {
                res.locals.items = docs;
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{});
            }
        })
    },
    createRole:(req,res,next)=>{
        new Role(req.body).save((err, doc) => {
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                res.locals.err=err;
                response.error(req, res, next,{});
            }
        })
    },
    getEachRole:(req,res,next)=>{
        Role.findById(req.params.adminId).exec((err,doc)=>{
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
    updateEachRole:(req,res,next)=>{
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
    deleteEachRole:(req,res,next)=>{
        Role.findByIdAndUpdate(req.params.adminId, {
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