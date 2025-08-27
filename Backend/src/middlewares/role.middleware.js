const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

export default roleMiddleware;
