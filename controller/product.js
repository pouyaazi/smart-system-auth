const Product=require('../models/product');
const response=require('./response');
module.exports = {
    getAllProduct:(req,res,next)=>{
        Product.find({}).exec((err, docs) => {
            if (docs) {
                res.locals.items = docs;
                response.ok(req, res, next,{});
            } else {
                response.error(req, res, next,{});
            }
        })
    },
    createProduct:(req,res,next)=>{
        req.body.adminId=res.locals.adminInfo._id;
        new Product(req.body).save((err, doc) => {
            if (doc) {
                res.locals.item=doc;
                response.ok(req, res, next,{});
            } else {
                res.locals.err=err;
                response.error(req, res, next,{});
            }
        })
    },
    getEachProduct:(req,res,next)=>{
        Product.findById(req.params.productId).exec((err,doc)=>{
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
    updateEachProduct:(req,res,next)=>{
        Product.findByIdAndUpdate(req.params.productId,req.body, {
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
    deleteEachProduct:(req,res,next)=>{
        Product.findByIdAndUpdate(req.params.productId, {
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