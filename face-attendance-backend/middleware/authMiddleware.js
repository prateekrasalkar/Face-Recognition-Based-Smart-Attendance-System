// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ msg: "No token" });

  const decoded = jwt.verify(token, "SECRET_KEY");
  req.teacherId = decoded.id;
  next();
};
