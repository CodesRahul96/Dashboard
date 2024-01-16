const adminMiddleware = async (req, res, next) => {
    try {
      console.log(req.user);
      const adminRole = req.user.isAdmin;
      if(!adminRole){
          res.status(403).json({message: "Access denied. User is not an admin"})
      }
      // If user is an admin, then proceed next middleware
      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = adminMiddleware;
  