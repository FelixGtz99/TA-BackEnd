const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const postUser = async (req, res = response) => {
  const { email, pass } = req.body;
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(404).json({
        msg: "El correo ya esta registrado",
      });
    }
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.pass = bcrypt.hashSync(pass, salt);
    const token = await generateJWT(user.id);
    await user.save();
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo en error",
    });
  }
};

const getUser = async (req, res = response) => {};

const putUser = async (req, res = response) => {};

const deleteUser = async (req, res = response) => {};

module.exports={
    postUser,
    getUser,
    putUser,
    deleteUser
}