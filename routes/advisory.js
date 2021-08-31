const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { postAdvisory, getAdvisoryById } = require("../controllers/advisory");
const { validateData } = require("../middlewares/validate-data");
const { checkToken } = require("../middlewares/check-token");
router.post("/",[
    checkToken,
    check("student", "Es necesario el id del estudiante ").isMongoId(),
    check("course","Es necesario el id del curso").isMongoId(),
    check("days","Es necesario especificar los dias").not().isEmpty(),
    validateData
    
], postAdvisory)
router.get("/",checkToken,getAdvisoryById)
module.exports = router;
