const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { renewToken, login } = require("../controllers/auth");
const { checkToken } = require("../middlewares/check-token");
const { validateData } = require("../middlewares/validate-data");

router.post('/',[
    check('email','el correo es obligatorio').isEmail(),
    check('pass','el pass es obligatorio').not().isEmpty(),
    validateData
],login)
router.post('/google',[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validateData
])
router.get('/renew', checkToken,renewToken)
module.exports= router