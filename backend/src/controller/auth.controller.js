const userService=require('../services/user.service')
const jwtProvider=require('../config/jwtProvider')
const bcrypt = require('bcrypt')
const cartService=require('../services/cart.service')


//authenticatinng user and lettin login and register
const register=async(req,res)=>
{
    try {
        const user=await userService.createUser(req.body); 
        const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user);
        return res.status(200).send({jwt,message:"register success"})
    } catch (error) {return res.status(500).send({error:"register fail"})}
}

const login=async(req,res)=>
{
    const {password,email}=req.body
    try {
        const user=await userService.getUserByEmail(email)

        if(!user)
        {
            return res.status(404).send({message:'user not found with email:',email})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){return res.status(401).send({message:"Invalid Password..."})}

        const jwt=jwtProvider.generateToken(user._id); 

        console.log('jwt',jwt)

        return res.status(200).send({jwt,message:"login success"})
        
    } catch (error) {return res.status(500).send({error:error.message})    } 
} 

const adminLogin=async(req,res)=>
{
    const {password,email}=req.body
    try {
        const user=await userService.getAdminUserByEmail(email)   

        if(!user)
        {
            return res.status(404).send({message:'Admin not found with email:',email})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){return res.status(401).send({message:"Invalid Password..."})}

        const jwt=jwtProvider.generateToken(user._id); 

        return res.status(200).send({jwt,message:"login success"})
        
    } catch (error) {return res.status(500).send({error:error.message})    }
} 

const forgotPassword = async(req,res)=>
{
    // console.log('controller',req.body.email);
    try
    {
        const email = req.body.email;
        const user = await userService.passwordResetForUser(email)
        // console.log('controller user',user);
        if(!user)
        {
            return res.status(404).send({message:'User not found with this email:',email})
        }

        return res.status(200).send({message:"Password reset mail sent"})

    }catch (error) {return res.status(500).send({error:error.message}) }
}

const resetPassword = async(req,res)=>
{
    // console.log('controller',req.body);
    try
    {
        const email = req.body.email;
        const user = await userService.passwordUpdateForUser(req.body.email,req.body.password,req.body.token)
        console.log('user',user);
        if(user)
        {
             return res.status(200).send({message:"ok"})

        }
         return res.status(404).send({message:'User not found with this email:',email})
    }catch (error) {return res.status(500).send({error:error.message}) }
}

module.exports={
    register,
    login,
    adminLogin,
    forgotPassword,
    resetPassword
}
