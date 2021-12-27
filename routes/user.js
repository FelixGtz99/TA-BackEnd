const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  postUser,
  getUser,
  updateBanStatus,
  getUsersBanned,
  getTeachers,
  putUser,
  updateUserType,
  getPopularTeachers,
} = require("../controllers/users");
const { checkToken } = require("../middlewares/check-token");
const { validateData } = require("../middlewares/validate-data");

router.post(
  "/",
  [
    check("name", " El campo nombre es obligatorio").not().isEmpty(),
    check("email", " El campo email es obligatorio").isEmail(),
   // check("birthday", " La fecha de nacimiento es obligatoria").not().isEmpty(),
    check("pass", " El campo contraseña es obligatorio").not().isEmpty(),
    check("userType", "No se ha definido el tipo de usuario").not().isEmpty(),

    validateData,
  ],
  postUser
);

router.get("/:id", checkToken, getUser);

router.put(
  "/banstatus/:id",
  [
    checkToken,
    check("finishBan", "Es necesaria la fecha de finalización")
      .not()
      .isEmpty(),
    check("isBanned", "Es necesario designar status").isBoolean(),
    validateData,
  ],
  updateBanStatus
);
router.put('/:id',checkToken, putUser)
router.put('/type/:id', updateUserType)
router.get("/banned", checkToken, getUsersBanned);
router.get("/teachers", checkToken, getTeachers);
router.get("/popular/teacher", getPopularTeachers);
module.exports = router;
