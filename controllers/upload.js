const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { updateImg } = require("../helpers/updateImg");
//Area a utilizar por si me interesa subir al servidor, Pero por ahora planeo subir aun servidor externo

const filesUpload = (req, res) => {
  const type = req.params.dataType;
  const id = req.params.ref;
  const {path}=req.body
  const validDataTypes = ["users", "certification", "evidence"];
  if (!validDataTypes.includes(type)) {
    return res.json({
      ok: false,
      msg: "El tipo no es valido",
    });
  }
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).json({
  //     msg: "No hay archivo",
  //   });
  // }

  // const file = req.files.data;
  // const fileName = file.name.split(".");
  // const fileType = fileName[fileName.length - 1];
  // const validFileType = ["png", "jpg", "jpeg", "gif", "pdf"];

  // if (!validFileType.includes(fileType)) {
  //   return res.json({
  //     msg: "tipo de formato no valido",
  //   });
  // }

  // const name = `${uuidv4()}.${fileType}`;
  // const pathImg = `./uploads/${type}/${name}`;

  // file.mv(pathImg, (err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       msg: "Hubo un error en el guardado de imagen",
  //     });
  //   }
  // });
console.log(path);
  updateImg(type, id, path);
  res.json({
    ok: true,
    msg: "imagen guardada correctamente",
    path,
  });
};

const returnFile = (req, res) => {
  const type = req.params.dataType;
  const ref = req.params.ref;
  const pathImg = path.join(__dirname, `../uploads/${type}/${ref}`);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  filesUpload,
  returnFile,
};
