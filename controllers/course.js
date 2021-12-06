const { response } = require("express");

const Course = require("../models/course");

const getCourses = async (req, res = response) => {
  const courses= await Course.find()
  res.json({
    courses
  })
};
const getCoursesByCategory= async(req, res=response)=>{
  const category = req.params.id
  const courses = await Course.find({category})

  res.json({courses})

}
//Retorna los cursos de un instructor
const getCoursesById = async (req, res=response)=>{
  const id = req.params.id
  
  const courses = await Course.find({teacher:id}).populate("category","name").populate("level","name").populate("user","name img")

  res.json({
    courses
  })
}


const postCourse = async (req, res = response) => {
  const course = new Course(req.body);
 
  console.log(req.body);
  const { category, teacher,level } = req.body;
  try {
    const existsCourse = await Course.findOne({ category, teacher, level });
    console.log('se esta creato')
    if (existsCourse) {
      return res.json({
        ok:false,
        msg: "El instructor ya cuenta con un curso en esa catagoria",
      });
    }

    await course.save();
    res.json({
      ok:true,
      msg:'El curso fue guardado con exito',
      course,
    });
  } catch (error) {
    res.json({
      ok:false,
      
      msg:error,
    });
  }
};

const putCourse = async (req, res = response) => {
  const id = req.params.id 
  const data=req.body
  try {
    const existsCourse= await Course.findById(id)
    if(!existsCourse){
      return res.status(505).json({
        msg:'no existe el curso'
      })
    }
    const updatedCourse= await Course.findByIdAndUpdate(id,data,{new:true})
    res.json({
      updatedCourse
    })
  } catch (error) {
    res.status(404).json({
      error
    })
  }
 };


 //temporalemente hasta que se cambie la gestion de asesorias 
 //TODO: verificar que no se elimine si existe una asesoria
 //FIXME: pensar si mejor idea es desactivar.
const deleteCourse = async (req, res = response) => {

  const id = req.params.id

  await Course.findByIdAndDelete(id)
};

module.exports = {
  getCourses,
  getCoursesById,
  postCourse,
  putCourse,
  deleteCourse,
  getCoursesByCategory
};
