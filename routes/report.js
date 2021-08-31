const  {Router} = require('express')
const router=Router()
const {check} = require("express-validator")
const { postReport } = require('../controllers/report')
const {checkToken}=require("../middlewares/check-token")
const {validateData}=require("../middlewares/validate-data")

router.post('/',[
    checkToken,
    check("student","Es necesario el id del estudiante").isMongoId(),
    check("teacher","Es necesario el id del instructor").isMongoId(),
   // check("date","Es necesario la fecha del reporte").isDate(),
    check("text","Es necesario el motivo").not().isEmpty(),
    validateData
],postReport)


module.exports=router