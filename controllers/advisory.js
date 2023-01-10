const { response } = require("express");

const Advisory = require("../models/advisory");

const postAdvisory = async (req, res = response) => {
  const advisory = Advisory(req.body);
  await advisory.save();

  res.status(201).json({
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
  const id = req.params.id;
  const advisories = await Advisory.findByStudent({ student: id })
    .populate("student", "name")
    .populate({
      path: "course",
      model: "Course",
      select: "teacher days category level imgsRef",
      populate: { path: "teacher", model: "User", select: "name" },
      populate: { path: "category", model: "Category", select: "name" },
      populate: { path: "level", model: "Level", select: "name " },
    });
  res.json({
    ok: true,
    advisories,
  });
};

module.exports = {
  postAdvisory,
  getAdvisoryById,
  getAdvisoryByStudent,
};
