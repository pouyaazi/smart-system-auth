var express = require('express');
const AdminController=require('../controller/admin');
const apiMiddleware=require('../middleware/api');
var router = express.Router();
const { body, check, validationResult } = require('express-validator');

const checkBody=require('../middleware/error').checkBody;

router.use([
    apiMiddleware.isExistToken,
    apiMiddleware.isExistAdmin,
    apiMiddleware.isActiveAdmin,
    apiMiddleware.isDeleteAdmin,
    apiMiddleware.isSuperAdmin,
])
router.get('/',AdminController.getAllAdmin);
router.post('/',
    body('password').notEmpty().isLength({ min: 6 }),
    checkBody,
    AdminController.createAdmin);
router.get('/:adminId',AdminController.getEachAdmin);
router.put('/:adminId/info',AdminController.updateEachAdminInfo);
router.put('/:adminId/status',AdminController.updateEachAdminStatus);
router.put('/:adminId/password',AdminController.updateEachAdminPassword);
router.delete('/:adminId',AdminController.deleteEachAdmin);

module.exports = router;
