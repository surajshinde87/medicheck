import jwt from "jsonwebtoken"

// user authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const {dtoken } = req.headers
   
     if(!dtoken){
     return res.json({succes: false, message:"User Not Authorized Login Again"})
     }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
  req.body.docId = token_decode.id
   next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

export default authDoctor