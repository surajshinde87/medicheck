import jwt from "jsonwebtoken"

// admin authentication middleware

const adminAuth = async (req, res, next) => {
  try {
    const {atoken } = req.headers
     if(!atoken){
     return res.json({succes: false, message:"Not Authorized Login Again"})
     }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
   if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
    return res.json({succes: false, message:"Not Authorized Login Failed"})
   }
   next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

export default adminAuth