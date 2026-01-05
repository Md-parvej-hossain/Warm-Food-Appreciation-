const jwt = require('jsonwebtoken');
// Generate JWT
exports.createJWT = async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '365d',
  });
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({ success: true });
};

// Logout
exports.logout = async (req, res) => {
  res
    .clearCookie('token', {
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({ success: true });
};
