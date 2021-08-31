const { response } = require("express");
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
      
      const report = new Report(req.body)
      await report.save()
    
      res.json(
          report
      )
  } catch (error) {
      
  }

};

const getReports = async (req,res=response)=>{
    
    const reports=  await Report.find()

    res.json({
        reports
    })

}

module.exports = {
  postReport, 
  getReports
};
