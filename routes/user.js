const {Router}=require('express')
const router = Router()
const {check} =require('express-validator')
const { postUser } = require('../controllers/users')
const { validateData } = require('../middlewares/validate-data')

router.post('/', 
[
    check('name', ' El campo nombre es obligatorio').not().isEmpty(),
    check('email', ' El campo email es obligatorio').isEmail(),
    check('birthday', ' La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('pass', ' El campo contraseña es obligatorio').not().isEmpty(),
    check('userType','No se ha definido el tipo de usuario').not().isEmpty(),



    validateData],
 postUser)
module.exports=router