const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwtUtil = require('../utils/jwtUtil');

exports.login = async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
          const token = jwtUtil.generateToken(user);

          // Set token in HTTP Only Cookie
          res.cookie('token', token, { httpOnly: true }); 
          res.cookie('userId', user._id, { httpOnly: true });
          res.cookie('userName', user.username, { httpOnly: true });

          res.json({ user, token });
      } else {
          res.status(401).json({ error: 'Invalid credentials' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
