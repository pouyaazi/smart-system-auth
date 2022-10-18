var express = require('express');
const AdminController=require('../controller/admin');
const apiMiddleware=require('../middleware/api');
var router = express.Router();
router.use([
    apiMiddleware.checkBody,
    apiMiddleware.isExistToken,
    apiMiddleware.isExistAdmin,
    apiMiddleware.isActiveAdmin,
    apiMiddleware.isDeleteAdmin,
])
router.get('/',AdminController.getAllAdmin);
router.post('/',AdminController.createAdmin);
router.get('/:adminId',AdminController.getEachAdmin);
router.put('/:adminId/info',AdminController.updateEachAdminInfo);
router.put('/:adminId/status',AdminController.updateEachAdminStatus);
router.put('/:adminId/password',AdminController.updateEachAdminPassword);
router.delete('/:adminId',AdminController.deleteEachAdmin);

module.exports = router;
