const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { renewToken } = require("../controllers/auth");
const { validateData } = require("../middlewares/validate-data");

router.get('/',[
    check('email','el correo es obligatorio').isEmail(),
    check('pass','el pass es obligatorio').not().isEmpty(),
    validateData
])

router.get('/renew', validateData,renewToken)
