
const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

const SECRET_KEY = process.env.SECRET_KEY ; 


// Generate a JWT Token
const generateToken = (userId) => {
    
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });    
};

// Verify and Extract User ID from Token
const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token,SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Log for debugging
        return null; // Return null if verification fails
    }
};

module.exports = { generateToken, getUserIdFromToken };

// const jwt= require("jsonwebtoken");

// const SECRET_KEY="dvdsvfnekfjbeslkoeigaawgaw"
// const generateToken=(userId)=>{
//     const token= jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"})
//     return token;
// }

// const getUserIdFromToken=(token)=>{
//     const decodedToken=jwt.verify(token,SECRET_KEY)
//     return decodedToken.userId;
// }
// module.exports={generateToken,getUserIdFromToken}