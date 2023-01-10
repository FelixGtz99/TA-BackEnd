const { Router } = require("express");
const {
  postCourse,
  getCourses,
  putCourse,
  deleteCourse,
  getCoursesById,
  getCoursesByCategory,
  changeStatusCourse,
  getPopularCourses,
  getRecentCourses,
  getCoursesByTeacherId,
} = require("../controllers/course");

const {check} = require('express-validator')
const { validateData } = require("../middlewares/validate-data");
const { checkToken } = require("../middlewares/check-token");
const router = Router();

router.get("/",checkToken, getCourses);

router.get("/id/:id", checkToken,getCoursesById)

router.get("/teacher/:id", checkToken,getCoursesByTeacherId)

router.get("/popular", getPopularCourses)

router.get("/recent", getRecentCourses)

router.post("/", [
  checkToken,
check('category', 'El campo categoria es invalido').isMongoId(),


check('price', 'El campo tarifa debe ser numero').isNumeric(),
check('teacher', 'El campo instructor es invalido').isMongoId(),
check('tags', 'Debe de existir por lo menos una etiqueta').not().isEmpty(),
check('level', 'El campo nivel es invalido').isMongoId(),
//check('imgsRef', 'El campo de imagenes es invalido').not().isEmpty(),
validateData
],postCourse);

router.put("/:id", putCourse);
router.put("/status/:id",checkToken, changeStatusCourse);

router.get('/category/:id',checkToken, getCoursesByCategory)

router.delete("/", deleteCourse);

module.exports = router;
