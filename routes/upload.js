const { Router } = require("express");
const router = Router();
const expressFileUpload = require("express-fileupload");
const { filesUpload } = require("../controllers/upload");
const { checkToken } = require("../middlewares/check-token");

router.use(expressFileUpload());

router.post('/:dataType',checkToken, filesUpload )

module.exports = router;
