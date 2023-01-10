const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
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

    if (!validPass) {
      res.status(404).json({
        ok: false,
        msg: "Datos no validos",
      });
    }
    const token = await generateJWT(userDB.id);
    res.json({
      token,
    });
  } catch (error) {}
};
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  console.log("ddd");
  console.log(uid);
  // Generar el TOKEN - JWT
  const token = await generateJWT(uid);
  try {
    const user = await User.findById(uid);
    res.json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      ok: true,
      msg: "no existe usuario",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  let isValid = true;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      isValid = false;
      user = new User({
        name: name,
        email,
        pass: "@@@",
        img: picture,
        google: true,
        // userType:'NOTYPE'
      });
    } else {
      // existe usuario
      user = userDB;
      user.google = true;
    }
    await user.save();
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      isValid,
      id: user.id,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      ok: false,
      msg: "Token invalid",
    });
  }
};

module.exports = {
  login,
  renewToken,
  googleSignIn,
};
