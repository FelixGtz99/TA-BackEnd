const { response } = require("express");
const Evaluation = require("../models/evaluation");

const postEvaluation = async (req, res = response) => {
  const { teacher, student } = req.body;
  const evaluation = Evaluation(req.body);
  try {
    const existsEvaluation = await Evaluation.findOne({ teacher, student });
    if (existsEvaluation) {
      return res.status(400).json({
        msg: "Este usuario ya evaluó a este maestro",
      });
    }

    await evaluation.save();
  } catch (error) {
    console.log(error);
    res.staus(500).json({
      msg: "Algo salio mal",
    });
  }

  res.json({
    evaluation,
  });
};

module.exports = {
  postEvaluation,
};
