const { model, Schema } = require("mongoose");

const EvaluationSchema = Schema(
  {
    adjectives: {
      type: Array,
      require: true,
    },

    score: {
      type: Number,
      require: true,
      min: 0,
    },
    teacher: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    student: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
  }
);

module.exports = model("Evaluation", EvaluationSchema);
