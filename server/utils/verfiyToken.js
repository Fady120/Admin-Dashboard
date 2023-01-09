import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    try {
      if (!token) {
        req.user = null;
      }else{
      const decrypt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = {
        id: decrypt.id,
        email: decrypt.email,
      };
    } 
      next();
    } catch (err) {
      return res.status(500).json(err.toString());
    }
  };

  export default verifyToken;