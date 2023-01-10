const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
{
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: [true,'Category is required'],
  },
  price: {
    type: Number,
    require: true,
    min:[0,'Minimum price is 0'],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, 'Teacher is required'],
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

},{

},

{
  statics: {
    findByUser(user) {
      return this.find({ user,hidden:false });
    },
    findByTeacher(teacher) {
      return this.find({ teacher,hidden:false});
    },
    findByCategory(Category) {
      return this.find({ category,hidden:false });
    },
  },
  timestamps: true,
}

) 
module.exports=model('Course', CourseSchema)