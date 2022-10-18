var express = require('express');
const ProductController=require('../controller/product');
var router = express.Router();

router.get('/',ProductController.getAllProduct);
router.post('/',ProductController.createProduct);
router.get('/:roleId',ProductController.getEachProduct);
router.put('/:roleId',ProductController.updateEachProduct);
router.delete('/:roleId',ProductController.deleteEachProduct);

module.exports = router;
