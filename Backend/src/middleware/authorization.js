const jwt = require("jsonwebtoken");
const authorization = (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const isValid = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (isValid) {
      next();
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ token: true, message: "Invalid Token" });
  }
};
module.exports = authorization;
