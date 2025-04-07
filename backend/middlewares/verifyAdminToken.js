// Middleware for verifying admin token
export function verifyAdminToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token,jwtSecretKey);
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };