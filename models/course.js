const { Schema, model } = require("mongoose");

const CourseSchema = {
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
  evaluations: {},
  level: {
    type: Schema.Types.ObjectId,
    ref: "level",
    require: true,
  },
  tags: {
    require:true,
    type: Array,
  },
  isBanned: {
    //require: true,
    type: Boolean,
    default: false,
  },
  evidence: {
    type: Array,
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
};
module.exports=model('Course', CourseSchema)