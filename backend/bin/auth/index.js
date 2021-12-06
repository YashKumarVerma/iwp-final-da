const jwt = require('jsonwebtoken');

// const sign a token with user details
const signToken = async (user) => {
  const token = await jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
    issuer: process.env.JWT_ISSUER,
  });

  return token;
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed',
    });
  }
};


module.exports = {signToken, authMiddleware}