const { Schema, model } = require("mongoose");

const ReportSchema = Schema({
    date:{
        type:Date,
      //  require:true,
        default:new Date().getDate(),
    },
    student:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    teacher:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    text:{
        type:String,
        require:true
    }
},
{
    statics: {
      findByTeacher(teacher) {
        return this.find({ teacher });
      },
      findByStudent(student) {
        return this.find({ student });
      },
    },
  })


module.exports=model('Report', ReportSchema)