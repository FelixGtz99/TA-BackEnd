const {Router}=require('express')
const { checkToken } = require('../middlewares/check-token')
const router=Router()
const {check}=require('express-validator')
const { validateData } = require('../middlewares/validate-data')
const { postEvaluation } = require('../controllers/evaluation')

router.post('/',[checkToken,
check('teacher', 'Es necesario el instructor a evaluar').isMongoId(),
check('student', 'Es necesario el usuario que evaluo').isMongoId(),
check('score','Es obligatoria la puntuacion').isNumeric(),
check('adjectives','Es necesario los adjetivos').not().isEmpty(),
validateData


],postEvaluation)




module.exports=router
