const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check for the Bearer token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object, excluding the password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = protect;
