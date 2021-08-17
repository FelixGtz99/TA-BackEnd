const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { renewToken, login } = require("../controllers/auth");
const { validateData } = require("../middlewares/validate-data");

router.post('/',[
    check('email','el correo es obligatorio').isEmail(),
    check('pass','el pass es obligatorio').not().isEmpty(),
    validateData
],login)

router.get('/renew', validateData,renewToken)
module.exports= router