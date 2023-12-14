const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Store this key in an environment variable

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
