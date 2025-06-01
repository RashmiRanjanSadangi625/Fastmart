const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwtProvider= require("../config/jwtProvider.js"); 
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");



const createUser = async (userData) => {
    // console.log("userData",userData) 
    try {
      let { firstName, lastName, email, password } = userData;
  
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        throw new Error(`User already exists with email: ${email}`);
      }
  
      if (!password) {
        throw new Error("Password is required");
      }
  
      password = await bcrypt.hash(password, 8);

      // console.log("userbefore",isUserExist)
  
      const user = await User.create({ firstName, lastName, email, password });
       // console.log("user",user)
      return user;
    } catch (error) {
      throw new Error(error.message);
    } 
  }; 
  


const findUserById=async(userId)=>{
    try     
    {
        const user=await User.findById(userId)
        .populate("address");
        if(!user)
        {
            throw new Error("user not found with ID:",userId);
        }        
        return user;
    }catch (error) {throw new Error(error.message)
    }
}
const getUserByEmail=async(email)=>{

    // console.log("email:", email); 
    try 
    {
        const user=await User.findOne({email});

        // console.log("user:", user); 
        if(!user)
        {
            throw new Error("user not found with email :",email);
        }   
        // console.log("userafter:", user);     
        return user;
    }catch (error) {throw new Error(error.message)
    }
}


const getUserProfileByToken = async (token) => {
    try {
        // console.log("Received Token:", token); 

        const userId = jwtProvider.getUserIdFromToken(token); 
        // console.log("Extracted User ID:", userId); 

        const user = await findUserById(userId);
        // console.log("Fetched User:", user); 

        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }

        return user;
    } catch (error) {
        // console.error("Error in getUserProfileByToken:", error.message);
        throw new Error(error.message); 
    }
};

const getAdminUserByEmail = async (email) => {
    // console.log("email:", email); 
    try 
    {
        const user = await User.findOne({ email, role: "ADMIN" });

        // console.log("user:", user); 
        if(!user)
        {
            throw new Error("user not found with email :",email);
        }   
        // console.log("userafter:", user);     
        return user;
    }catch (error) {throw new Error(error.message)
    }
};

const getAllUsers=async()=>
    {
    try {
        const users=await User.find({ role: "CUSTOMER" });
        // console.log("userafter:", users);     
        return users;
        
    } catch (error) {throw new Error(error.message)}
}

const passwordResetForUser = async(email)=>
{
    // console.log('service',email);
    try
    {
        // Generate a JWT Token
        const token = jwt.sign({ email }, 'jwt-secret', { expiresIn: '5m' });

        const user = await User.findOne({email:email})

        console.log('find',user);

        if(user.role !== 'CUSTOMER')
        {
            return false;
        }

        if(user)
        {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sadangirashmiranjan@gmail.com',
                pass: 'rwfr jsmm vzlb xlqp'
              }
            });

             // console.log('transporter',transporter);

            var mailOptions = {
              from: 'sadangirashmiranjan@gmail.com',
              to: email,
              subject: 'Fastmart passowrd reset !',
              text: `Please reset your password using the link below within 5 minutes:\n\nhttp://localhost:5173/resetPassword/${email}/${token}`
};
             // console.log('mailOptions',mailOptions);


            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                // console.log(error);
              } else {
                // console.log('Email sent: ' + info.response);
                return info.response;}
            });
        }
        return true;

    }
    catch(err){throw new Error(err.message)}

}

const passwordUpdateForUser = async (email,password,token) =>
{
    // console.log('service email',email);
    // console.log('service token',token);

    try
    {
      const isVerifiedToken = jwt.verify(token,'jwt-secret');
      console.log('verify',isVerifiedToken);

      if(!isVerifiedToken)
      { 
        console.log('Need a new token !')
        throw new Error("JWT token invalid");
      }

      const isUserExist = await User.findOne({ email });
      
      console.log('isUserExist',isUserExist);
      
      if (!isUserExist) {
        console.log('User not exists !')
        throw new Error(`User not exists with email: ${email}`);
      }
  
      if (!password) {
        throw new Error("Password is required");
      }
  
      const hashedPassword = await bcrypt.hash(password, 8);

      console.log('hashedPassword',hashedPassword);

      const updatePassword = await User.updateOne( { email: email },{ $set: { password: hashedPassword } });

      console.log('updatePassword',updatePassword);

      if(updatePassword)
      {
        return true;
      }
      return false;

    }
    catch(err)
    {throw new Error(err.message)}

}
 

module.exports={
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAdminUserByEmail,
    getAllUsers,
    passwordResetForUser,
    passwordUpdateForUser
};