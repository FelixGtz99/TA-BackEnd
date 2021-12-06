const { response } = require("express");
const { populate } = require("../models/advisory");

const Advisory = require("../models/advisory");

const postAdvisory = async (req, res = response) => {
  const advisory = Advisory(req.body);
  await advisory.save();

  res.json({
    advisory,
  });
};

const getAdvisoryById = async (req, res = response) => {
  const advisories = await Advisory.findById(req.body);

  res.json({
    advisories,
  });
};

const getAdvisoryByStudent = async (req, res = response) => {
  //TODO: hacer que funcione esto
  const {student}=req.body
  const advisories = await Advisory.findOne({ student}).populate("student","name").populate({
    path: "course",
    model: "Course",
    select: "days category level imgsRef",
    populate: { path: "teacher", model: "User", select: "name img" },
    populate: { path: "category", model: "Category", select: "name " },
    populate: { path: "level", model: "Level", select: "name " },

  })

  res.json({
    advisories,
  });
};

module.exports = {
  postAdvisory,
  getAdvisoryById,
  getAdvisoryByStudent,
};
