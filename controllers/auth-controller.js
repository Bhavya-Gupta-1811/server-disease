const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Welcome to world best");
  } catch (error) {
    console.log(error);
  }
}

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      msg: userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString()
    });
    
  } catch (error) {
    console.error("Register Error:", error);
    res.status(400).send({ msg: "Page not found" });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login received:", email, password);
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    console.log("password valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await userExist.generateToken();


    res.status(200).json({
      msg: "Login successful",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log("error from the user route",error)
  }
}
module.exports = { home, register, login, user};
 