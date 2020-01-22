const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  account: {
    type: String,
    default: "speaker"
  },
  adres: {
    type: String,
    default: "Ex: Poland"
  },
  phone: {
    type: String,
    default: "Ex: 000-0000-000-0000"
  },
  avatar: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: "Add a short description about yourself"
  },
  friends: {
    type: [String],
    default: [""]
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
