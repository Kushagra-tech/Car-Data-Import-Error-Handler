const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const hashConfirmPass = await bcrypt.hash(confirm_password, 10);

    const newUser = new User({
      email,
      password: hashPass,
      confirm_password: hashConfirmPass,
    });
    await newUser.save();
    res.json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    delete user.password;
    return res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const verify = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    return res.json({ token: true, decoded });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = {
  register,
  login,
  verify,
};
