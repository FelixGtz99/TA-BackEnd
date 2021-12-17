const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  getCertifications,
  getMyCertifications,
  updateStatus,
  deleteCertification,
  postCertification,
} = require("../controllers/certification");
const { checkToken } = require("../middlewares/check-token");
const { validateData } = require("../middlewares/validate-data");

router.get("/", checkToken, getCertifications);

router.get("/:id", checkToken, getMyCertifications);

router.post(
  "/",
  [
    checkToken,
    check("description", "Es necesario dar una descripcion").not().isEmpty(),
    check("docRef", "Es necesario un documento").not().isEmpty(),
    check("category", "Es necesario designar una categoria").isMongoId(),
    check("user", "Es necesario el id del teacher").isMongoId(),
    validateData,
  ],
  postCertification
);

router.put(
  "/:id",
  [
    checkToken,
    check("status", "Es necesario proveer el status").not().isEmpty(),
    check("feedback", "Es necesario dar feedback").not().isEmpty(),
    validateData,
  ],
  updateStatus
);

router.delete("/:id", checkToken, deleteCertification);

module.exports = router;
