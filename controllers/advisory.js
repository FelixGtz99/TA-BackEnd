const { response } = require("express");

const Advisory = require("../models/advisory")

const postAdvisory = async (req, res = response) => {
  const advisory = Advisory(req.body);
  await advisory.save()

  res.json({
      advisory
  })

};

const getAdvisoryById = async (req, res=response)=>{

  const advisories= await Advisory.find(req.body)

  res.json({
    advisories
  })
}



module.exports = {
  postAdvisory,
  getAdvisoryById
};
