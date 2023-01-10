const { Schema, model } = require("mongoose");
//TODO: Darle tipado a las propiedades
const AdvisorySchema = Schema(
  {
    days: {
      type: Array,
      require: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    statics: {
      findByCourse(course) {
        return this.find({ course });
      },
      findByStudent(student) {
        return this.find({ student });
      },
    },
  }
);

module.exports = model("Advisory", AdvisorySchema);
