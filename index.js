const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { dbConnection } = require("./database/config");
const app = express();
//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

dbConnection();

//Directorio Publico

//rutas
app.use("/api/auth", require("./routes/auth"));

app.use("/api/user", require("./routes/user"));

app.use("/api/category", require("./routes/category"));

app.use("/api/course", require("./routes/course"));

app.use("/api/advisory", require("./routes/advisory"));

app.use("/api/report", require("./routes/report"))

app.use("/api/evaluation", require("./routes/evaluation"))

app.use("/api/certification", require("./routes/certification"))

app.use("/api/level", require("./routes/level"))

//Esto es por si habilito la subida de archivos en el servidor
app.use("/api/uploads", require("./routes/upload"))

app.listen(process.env.PORT, () => {
  console.log("esta  running el hijo de su puta madre en " + process.env.PORT);
});
