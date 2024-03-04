  
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const secretKey = process.env.SECRET_KEY;
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        message: "Token is not provided",
      });
    }
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };