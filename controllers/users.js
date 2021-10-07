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

const getUser = async (req, res = response) => {
  const id = req.params.id;
  const user = User.findById(id);
  res.json({
    user,
  });
};

const putUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese usuario",
      });
    }
    //Actualizar
    const { pass, google, email, ...campos } = req.body;
    //esto es de un error que no me salio a mi, lo pongo por si las moscass
    if (userDB.email != email) {
      const existeEmail = await User.findOne({
        email,
      });
      if (existeEmail) {
        return res.status(404).json({
          ok: false,
          msg: "Correo Ya registrado",
        });
      }
    }
   if(!userDB.google) {
    campos.email = email;
   }else if (userDB.email !==email){
    return res.status(400).json({
      ok:false,
      msg:'usuarios de google no puede cambiar su correo'
    })
   }
  
    const updatedUser = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "la cagaste carnal",
    });
  }

};

const deleteUser = async (req, res = response) => {};

const updateBanStatus = async (req, res = response) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const existsUser = await User.findById(id);
    if (!existsUser) {
      return res.status(505).json({
        msg: "no existe el usuario",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    res.json({
      updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const getUsersBanned = async (req, res = response) => {
  const users = await User.find({ isBanned: true });

  res.json({
    users,
  });
};
const getTeachers = async (req, res = response) => {
  const teacher = await User.find({userRole:'TEACHER'})
  res.json({
    teacher
  })
};
module.exports = {
  postUser,
  getUser,
  putUser,
  deleteUser,
  updateBanStatus,
  getUsersBanned,
  getTeachers
};
