var express = require('express');
const RoleController=require('../controller/role');
var router = express.Router();

router.get('/',RoleController.getAllRole);
router.post('/',RoleController.createRole);
router.get('/:roleId',RoleController.getEachRole);
router.put('/:roleId',RoleController.updateEachRole);
router.delete('/:roleId',RoleController.deleteEachRole);

module.exports = router;
