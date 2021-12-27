const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
{
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  average:{},
  evaluations: {},
  level: {
    type: Schema.Types.ObjectId,
    ref: "Level",
    require: true,
  },
  tags: {
    require:true,
    type: Array,
  },
 hidden:{
    default:false,
    type:Boolean
  },
  isBanned: {
    //require: true,
    type: Boolean,
    default: false,
  },
  imgsRef: {

  },
  github: {
    type: String,
  },
  odrive: {
    type: String,
  },
  gdrive: {
    type: String,
  },

},

{
  timestamps: true,
}

) 
module.exports=model('Course', CourseSchema)