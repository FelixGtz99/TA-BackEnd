const mongoose = require("mongoose");
require('dotenv').config()
const dbConnection = async () => {
  try {
    await mongoose.connect(
        process.env.DB_CNN,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("arranco el maldito");
  } catch (error) {
    console.log(error);
    console.error("no arranco");
  }
};

module.exports = {
  dbConnection,}