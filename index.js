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
app.use('/api/auth', require('./routes/auth'))

app.use('/api/user', require('./routes/user'))
app.listen(process.env.PORT, () => {
  console.log("esta  running el hijo de su puta madre en " + process.env.PORT);
});
