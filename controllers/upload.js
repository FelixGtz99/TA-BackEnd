const { v4: uuidv4 } = require("uuid");
const path = require("path");

//Area a utilizar por si me interesa subir al servidor, Pero por ahora planeo subir aun servidor externo

const filesUpload = (req, res) => {

  console.log('entra aqui');
  const type = req.params.dataType;
  
  
  if (!req.files || Object.keys(req.files).length === 0) {
 
    return res.status(400).json({
      msg: "No hay archivo",
    });
  }

  const file = req.files.data;
  const fileName = file.name.split(".");
  const fileType = fileName[fileName.length - 1];
  const validFileType = ["png", "jpg", "jpeg", "gif", "pdf"];

  if (!validFileType.includes(fileType)) {
    return res.json({
      msg: "tipo de formato no valido",
    });
  }

  const name = `${uuidv4()}.${fileType}`;
  const pathImg = `./uploads/${type}/${name}`;

  file.mv(pathImg, (err) => { 
    if (err) {
      
      console.log(err);
      return res.status(500).json({
        msg: "Hubo un error en el guardado de imagen",
      });
    }
  });
 
  res.json({
      msg:'imagen guardada correctamente',
      dir:path.join(__dirname, pathImg)
  })
};

module.exports = {
  filesUpload,
};
