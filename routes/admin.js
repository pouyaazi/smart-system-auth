var express = require('express');
const AdminController=require('../controller/admin');
var router = express.Router();

router.get('/',AdminController.getAllAdmin);
router.post('/',AdminController.createAdmin);
router.get('/:adminId',AdminController.getEachAdmin);
router.put('/:adminId/info',AdminController.updateEachAdminInfo);
router.put('/:adminId/status',AdminController.updateEachAdminStatus);
router.put('/:adminId/password',AdminController.updateEachAdminPassword);
router.delete('/:adminId',AdminController.deleteEachAdmin);

module.exports = router;
