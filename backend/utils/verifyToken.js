
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next, callback) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
      }
  
      req.user = user;
      if (callback) {
        callback(); // 🟢 callback now works
      } else {
        next(); // fallback to default middleware chain
      }
    });
  };
  

export const verifyUser = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
      }
  
      req.user = user;
  
      if (req.user.id === req.params.id || req.user.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ success: false, message: "Forbidden: Not authenticated" });
      }
    });
  };
  


export const verifyAdmin = (req,res, next) => {
   
    verifyToken(req,res,next,()=>{
        if(req.user.role === 'admin'){
            next();
        }
        else{
            return res.status(401).json({success:false, message:"you are not authorize"});
        }
    });
};