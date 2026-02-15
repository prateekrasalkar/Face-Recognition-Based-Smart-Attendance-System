const jwt = require("jsonwebtoken");

const SECRET = "secretkey"; // keep SAME as authMiddleware

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
