
import User from '../Models/Tour.js';


  export const createUser = async (req, res) => {
    const newUser = new User(req.body);
  
    try {
      const saveUser = await newUser.save();
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: saveUser,
      });
    } catch (err) {
      
      res.status(500).json({
        success: false,
        message: "Failed to create. Try again",
      });
    }
  };
  

  export const updateUser = async (req, res) => {
    const id = req.params.id;
   
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
  
  
      
      res.status(200).json({
        success: true,
        message: 'Successfully updated',
        
      });
  
    } catch (err) {
      
      res.status(500).json({
        success: false,
        message: 'Failed to update',
        
      });
    }
  };
  
  
  
  export const deleteUser = async (req, res) => {
    const id = req.params.id;
   
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
  
      
      res.status(200).json({
        success: true,
        message: 'Successfully deleted',
        
      });
  
    } catch (err) {
      
      res.status(500).json({
        success: false,
        message: 'Failed to update',
        
      });
    }
  };
  

  export const getSingleUser = async(req, res) => {
    const id = req.params.id;
   
  
    try {
      const user =  await User.findById(id);
  
  
      
      res.status(200).json({
        success: true,
        message: 'Successfully deleted',
        data: user
      });
  
    } catch (err) {
      
      res.status(404).json({
        success: false,
        message: 'not found',
        
      });
    }
  };

  export const getAllUser = async(req, res) => {
     
     try {
      const users =  await User.find({});
  
  
      
      res.status(200).json({
        success: true,
        message: 'Successful',
        data: users,
      });
  
    } catch (err) {
      
      res.status(404).json({
        success: false,
        message: 'not found',
        
      });
    }
  };