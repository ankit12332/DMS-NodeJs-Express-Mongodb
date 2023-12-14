const jwtUtil = require('../utils/jwtUtil');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('No Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Bearer token not found');
    }

    const decoded = jwtUtil.verifyToken(token);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = authenticate;
