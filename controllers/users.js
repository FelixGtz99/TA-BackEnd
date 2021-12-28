const { response } = require("express");
const User = require("../models/user");
const Course = require("../models/course");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const course = require("../models/course");
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
  var user = await User.findById(id);

  if (user) {
    user = await getEvaluationsAverage(user)
    res.json({
      ok: true,
      user,
    });
  } else {
    res.json({
      ok: false,
      msg: "No user",
    });
  }
};
const getUserByEmail = async (req, res = response) => {
  const { email } = req.body;
  const user = User.find({ email });
  if (user) {
    res.json({
      user,
    });
  } else {
    res.json({
      ok: false,
      msg: "No user",
    });
  }
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
    if (!userDB.google) {
      campos.email = email;
    } else if (userDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "usuarios de google no puede cambiar su correo",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "la cagaste carnal",
    });
  }
};

const updateUserType = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    res.json({
      ok: true,
      updatedUser,
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
  const teachers = await User.find({ userType: "TEACHER" });
  teachers.forEach((teacher) => {});

  res.json({
    teachers,
  });
};
const getPopularTeachers = async (req, res = response) => {
  const teachers = await User.find({ userType: "TEACHER" });
  var teacherLoop = new Promise((resolve, reject) => {
    teachers.forEach(async (teacher, index, array) => {
      teacher = await getEvaluationsAverage(teacher);
      if (index === array.length - 1) resolve();
    });
  });

  teacherLoop.then(() => {
    teachers.map((t) => {
      if (t.evaluations > 5) return t;
    });
    teachers.sort((a, b) => b.average - a.average);
    teachers.slice(10);
    res.json({
      ok: true,
      teachers,
    });
  });
};
async function getEvaluationsAverage(teacher) {
  let evaluations = 0;
  let punctuations = 0;
  const courses = await Course.find({ teacher: teacher._id });
  console.log(courses)
  courses.forEach((course) => {
    if(course.evaluations!=undefined){
      course.evaluations.forEach((e) => {
        evaluations++;
        punctuations += e.punctuation;
      });
    }

  });
  teacher.evaluations = evaluations;
  teacher.average = punctuations / evaluations;
  return teacher;
}
module.exports = {
  postUser,
  getUser,
  putUser,
  deleteUser,
  updateBanStatus,
  getUsersBanned,
  getTeachers,
  updateUserType,
  getPopularTeachers,
};
