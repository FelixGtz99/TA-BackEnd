const Certification = require("../models/certification");

const postCertification = async (req, res) => {
  const certification = Certification(req.body);
  try {
    await certification.save();
    res.status(201).json({
      ok: true,
      certification,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const getCertifications = async (req, res) => {
  const certifications = await Certification.find();

  res.json({
    certifications,
  });
};

const getMyCertifications = async (req, res) => {
  const user = req.params.id;
  const certifications = await Certification.findByUser(user).populate(
    "category",
    "name"
  );
  res.json({
    ok: true,
    certifications,
  });
};

const updateStatus = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const existsCertification = await Certification.findById(id);
    if (!existsCertification) {
      return res.status(404).json({
        msg: "No existe esa certificación",
      });
    }
    //Status y feedback
    const updatedCertification = await Certification.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    res.json(updatedCertification);
  } catch (error) {
    res.status(500).json({ msg: "algo salio mal" });
  }
};

const deleteCertification = async (req, res) => {
  const id = req.params.id;
  try {
    const existsCertification = await Certification.findById(id);
    if (!existsCertification) {
      return res.status(404).json({
        msg: "No existe esa certificacion",
      });
    }

    await Certification.findByIdAndDelete(id);

    res.status(409).json({
      msg: "Eliminado",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = {
  postCertification,
  getCertifications,
  getMyCertifications,
  updateStatus,
  deleteCertification,
};
