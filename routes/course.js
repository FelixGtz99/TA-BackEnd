const { Router } = require("express");
const {
  postCourse,
  getCourses,
  putCourse,
  deleteCourse,
  getCoursesById,
  getCoursesByCategory,
} = require("../controllers/course");

const {check} = require('express-validator')
const { validateData } = require("../middlewares/validate-data");
const { checkToken } = require("../middlewares/check-token");
const router = Router();

router.get("/",checkToken, getCourses);

router.get("/teacher/:id", checkToken, getCoursesById)

router.post("/", [
  checkToken,
check('category', 'El campo categoria es invalido').isMongoId(),
check('category', 'El campo categoria es invalido').isMongoId(),

check('price', 'El campo tarifa debe ser numero').isNumeric(),
check('teacher', 'El campo instructor es invalido').isMongoId(),
check('tags', 'Debe de existir por lo menos una etiqueta').not().isEmpty(),
check('level', 'El campo nivel es invaliod').isMongoId(),
validateData
],postCourse);

router.put("/:id", putCourse);

router.get('/category/:id',checkToken, getCoursesByCategory)

router.delete("/", deleteCourse);

module.exports = router;
