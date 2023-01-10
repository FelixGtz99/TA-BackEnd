const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    img: {
      type: String,
    },
    cellphone: {
      type: Number,
    },
    pass: {
      type: String,
      required: true,
    },
    registerDate: {
      type: Date,
    },
    showInfo: {
      default: false,
      type: Boolean,
    },
    userType: {
      require: true,
      type: String,
      default: "STUDENT",
    },
    bio: {
      type: String,
    },
    google: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    finishBan: {
      type: Date,
    },
    schedule: {},

    evaluations: {},
    average: {},
  },

  {
    statics: {
      findByUserType(userType) {
        return this.find({ userType, isBanned: false });
      },
    
    },
  }
);

UserSchema.method("toJson", function () {
  const { __v, pass, ...object } = this.toObject();
  return object;
});

module.exports = model("User", UserSchema);
