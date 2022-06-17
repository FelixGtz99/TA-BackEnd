const mongoose = require("mongoose");
require('dotenv').config()
const dbConnection = async () => {
  try {
    await mongoose.connect(
        process.env.DB_CNN,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,}
