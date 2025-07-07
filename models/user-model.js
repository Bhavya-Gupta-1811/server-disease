const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next(); 
  } catch (error) {
    return next(error); 
  }
});


userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () { 
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
      process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      }
    )
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;