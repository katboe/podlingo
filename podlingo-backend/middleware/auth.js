import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach user information to the request object
    next();
  });
};