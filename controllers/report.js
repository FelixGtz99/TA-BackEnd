const { response, json } = require("express");
const Report = require("../models/report");

const postReport = async (req, res = response) => {
  const { student, teacher } = req.body;
  console.log(req.body);
  const existsReport = await Report.findOne({ student, teacher });
  try {
    if (existsReport) {
      return res.json({
        msg: "Ya has reportado este instructor",
      });
    }

    const report = new Report(req.body);
    await report.save();

    res.json(report);
  } catch (error) {}
};

const getReports = async (req, res = response) => {
  const reports = await Report.find();

  res.json({
    reports,
  });
};
const existsReport = async (req, res = response) => {
  const report = await Report.findOne({ teacher, student });
  const isReported = false;

  if (report) isReported = true;

  res.json({
    isReported,
  });
};

const deleteReport = async (req, res = response) => {
  const id = req.params.id;

  try {
    const existsReport = await Report.findOne(id);
    if (!existsReport) return res.json("no existe el reporte");
    await Report.findOneAndDelete(id);
  } catch (error) {}
};
module.exports = {
  postReport,
  getReports,
  existsReport,
  deleteReport
};
