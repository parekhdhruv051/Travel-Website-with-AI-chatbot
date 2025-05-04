import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

 export const register = async(req,res)=>{



    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo

        });

        await newUser.save();

        res.status(200).json({
            success:true,
            message:'Successfully created'
        });

    } catch (err) {

        res.status(500).json({
            success:false,
            message:'Failed to create, Try again'
        });
        
    }
 };


 export const login = async (req, res) => {
    const email = req.body.email;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (!checkCorrectPassword) {
        return res.status(401).json({ success: false, message: 'Incorrect email or password' });
      }
  
      const { password, role, ...rest } = user._doc;
  
      // Generate token with JWT
      const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15d' }
      );
  
      // Set cookie
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production (ensure HTTPS is used)
        sameSite: 'None', // For cross-origin requests
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Expiry for 15 days
      }).status(200).json({
        token,
        data: { ...rest },
        role,
      });
  
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to login' });
    }
  };
  