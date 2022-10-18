var express = require('express');
const ProductController=require('../controller/product');
const apiMiddleware=require('../middleware/api');

const { body, check, validationResult } = require('express-validator');

const checkBody=require('../middleware/error').checkBody;


var router = express.Router();
router.use([
    apiMiddleware.isExistToken,
    apiMiddleware.isExistAdmin,
    apiMiddleware.isActiveAdmin,
    apiMiddleware.isDeleteAdmin,
])
router.get('/',ProductController.getAllProduct);
router.post('/',
    body('title').isString().notEmpty().withMessage('Title is Wrong'),
    checkBody,
    apiMiddleware.isSupportUser,ProductController.createProduct);
router.get('/:productId',ProductController.getEachProduct);
router.put('/:productId',apiMiddleware.isSuperAdmin,ProductController.updateEachProduct);
router.delete('/:productId',ProductController.deleteEachProduct);

module.exports = router;
