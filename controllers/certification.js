const Certification = require("../models/certification");

const postCertification =  async (req, res) => {
  const certification= Certification(req.body)
  await certification.save()
   res.json({
       certification
   })
};

const getCertifications = async (req, res) => {
    const certifications= await Certification.find()

    res.json({
        certifications
    })
};

const getMyCertifications = async (req, res) => {
    const user=req.params.id
    console.log(user)
    const certifications= await Certification.find({user})

    res.json({
        certifications
    })
};

const updateStatus = async(req, res) => {
    const id = req.params.id
    const data=req.body
try {
    const existsCertification = await Certification.findById(id)
     if(!existsCertification){
         return res.json({
             msg:'No existe esa certificacion'
         })
     }
     //Status y feedback
    const updatedCertification = await Certification.findByIdAndUpdate(id,data ,{new:true})

    res.json(
        updatedCertification
    )

} catch (error) {
    console.log(error)
    res.json({msg:'algo salio mal'})
}
};

const deleteCertification= async(req, res)=>{
   const id =req.params.id
   try {
    const existsCertification = await Certification.findById(id)
    if(!existsCertification){
        return res.json({
            msg:'No existe esa certificacion'
        })
    }

     await Certification.findByIdAndDelete(id)

     res.json({
         msg:'Eliminado'
     })
   } catch (error) {
       console.log(error)
       res.json({
           msg:'Algo salio mal'
       })
   }

}

module.exports = {
    postCertification,
    getCertifications,
    getMyCertifications,
    updateStatus,
    deleteCertification
};
