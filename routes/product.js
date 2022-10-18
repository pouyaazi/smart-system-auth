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
router.post('/',ProductController.createProduct);
router.get('/:roleId',ProductController.getEachProduct);
router.put('/:roleId',ProductController.updateEachProduct);
router.delete('/:roleId',ProductController.deleteEachProduct);

module.exports = router;
