var express = require('express');
const ProductController=require('../controller/product');
const apiMiddleware=require('../middleware/api');
var router = express.Router();
router.use([
    apiMiddleware.checkBody,
    apiMiddleware.isExistToken,
    apiMiddleware.isExistAdmin,
    apiMiddleware.isActiveAdmin,
    apiMiddleware.isDeleteAdmin,
])
router.get('/',ProductController.getAllProduct);
router.post('/',apiMiddleware.isSupportUser,ProductController.createProduct);
router.get('/:productId',ProductController.getEachProduct);
router.put('/:productId',apiMiddleware.isSuperAdmin,ProductController.updateEachProduct);
router.delete('/:productId',ProductController.deleteEachProduct);

module.exports = router;
