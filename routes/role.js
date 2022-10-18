var express = require('express');
const RoleController=require('../controller/role');
const apiMiddleware=require('../middleware/api');
var router = express.Router();
router.use([
    apiMiddleware.checkBody,
    apiMiddleware.isExistToken,
    apiMiddleware.isExistAdmin,
    apiMiddleware.isActiveAdmin,
    apiMiddleware.isDeleteAdmin,
])
router.get('/',RoleController.getAllRole);
router.post('/',RoleController.createRole);
router.get('/:roleId',RoleController.getEachRole);
router.put('/:roleId',RoleController.updateEachRole);
router.delete('/:roleId',RoleController.deleteEachRole);

module.exports = router;
