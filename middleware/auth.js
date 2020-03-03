const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return next(err);
      req.userId = decoded.userid;
      next();
    });
  } else {
    res.status(401).json({ success: false, message: "Token not found" });
  }
};