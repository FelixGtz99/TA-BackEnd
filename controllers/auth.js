const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const login = async (req, res = response) => {
  const { email, pass } = req.body;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      res.status(404).json({
        msg: "No existe una cuenta asociada a ese correo",
      });
    }

    const validPass = bcrypt.compareSync(pass, userDB.pass);
    const token = await generateJWT(userDB.id);
    res.json({
      token,
    });
  } catch (error) {}
};
const renewToken = async (req, res = response) => {
    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);
    res.json({
      ok: true,
      uid,
    });
  };
  
module.exports={
    login,
    renewToken
}