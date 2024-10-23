import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {

  const token = req.cookies.token; // Get token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Unauthorized: Invalid or expired token' }); // Forbidden if token is invalid
    }
    req.user = user; // Save the user info for use in the next middleware
    next();
  });
};

export default authenticateJWT;