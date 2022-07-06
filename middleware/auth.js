const jwt = require("jsonwebtoken");
const config = require("config");

// next is a call we need to run once we are done
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify the token
  try {
    // To decode the token we use .verify method
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // decoded has the value of payload which holds the user obj
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
