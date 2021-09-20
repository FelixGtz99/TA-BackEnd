const { Router } = require("express");
const router = Router();
const expressFileUpload = require("express-fileupload");
const { filesUpload, returnFile } = require("../controllers/upload");
const { checkToken } = require("../middlewares/check-token");

router.use(expressFileUpload());

router.put('/:dataType',checkToken, filesUpload )

router.get('/:dataType/:ref',returnFile)
module.exports = router;
