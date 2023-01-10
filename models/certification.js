const { Schema, model } = require("mongoose");

const CertificationSchema = Schema(
  {
    description: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    docRef: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    //Approved, rejected, pending
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["Approved", "rejected", "pending"],
        message: "{VALUE} not valid",
      },
    },
    feedback: {
      type: String,
    },
  },
  {
    statics: {
      findByUser(user) {
        return this.find({ user });
      },
      findByStatus(status) {
        return this.find({ status });
      },
      findByCategory(Category) {
        return this.find({ category });
      },
    },
  }
);

module.exports = model("Certification", CertificationSchema);
