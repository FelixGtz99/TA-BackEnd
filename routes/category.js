const { Router } = require("express");
const { postCategory, getCategories, putCategory, deleteCategory } = require("../controllers/category");
const router = Router();
const { check } = require("express-validator");
const { validateData } = require("../middlewares/validate-data");

router.post(
  "/",
  [check("name", "la categoria debe tener nombre").not().isEmpty(), validateData],
  postCategory
);
router.get('/',getCategories)

router.put('/',putCategory)

router.delete('/',deleteCategory)


module.exports = router;
