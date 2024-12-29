import validator from 'validator'
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctoModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

// Api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message:"Missing Details"})
        }
        // Validating Email
    if (!validator.isEmail(email)) {
        return res.json({success: false, message:"Enter a valid email"})
    }
//   Validating Strong Password
    if (password.length < 8) {
        return res.json({success: false, message:"Password should be at least 8 characters long"})
    }
  
    //  Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword  = await bcrypt.hash(password, salt)

 const   userData = {
     name,
     email,
     password: hashedPassword
    }

   const newUser = new userModel(userData)  
   const user = await newUser.save()
      
   const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

  res.json({success: true, token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Api for user Login 
const loginUser = async (req, res) => {
 try{
    const { email, password } = req.body;
    const user = await userModel.findOne({ email})
    if(!user){
        return res.json({success: false, message:"Use Does Not Exist"});
    }
    const match = await bcrypt.compare(password, user.password)
    if(match){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})
    }else{
        res.json({success: false, message:"Incorrect Password"});
    }

 }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
 }
}

// APi to get user profile data
const getProfile = async (req, res) => {
    try {
     const {userId} = req.body
     const userData = await  userModel.findById(userId).select('-password')  
        res.json({success: true, userData})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to update user profile data

const updateProfile = async (req, res) => {
    try {
     const {userId, name, phone, address, dob, gender} = req.body
     const imageFile = req.file
        
     if (!name || !phone || !dob || !gender) {
        return res.json({success: false, message:"DataMissing"})
     }

  await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender}) 

     if(imageFile){
        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
    const imageUrl = imageUpload.secure_url
         await userModel.findByIdAndUpdate(userId, {image:imageUrl})
     }

        res.json({success: true, message:"Profile updated successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Api to book appointment
const bookAppointment = async (req, res) => {
    try {
      const { userId, docId, slotDate, slotTime } = req.body;
  
      const docData = await doctorModel.findById(docId).select('-password');

      if (!docData.availability) {
        return res.json({ success: false, message: "Doctor not available" });
      }
  
      let slots_booked = docData.slots_booked ; // Ensure `slots_booked` exists
   
      // Initialize date key if it doesn't exist
      if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
          return res.json({ success: false, message: "Slot already booked" });
        }else{

          slots_booked[slotDate].push(slotTime);
        }
      }else{
       slots_booked[slotDate]  = []
       slots_booked[slotDate].push(slotTime);
      }

      // Fetch user data
      const userData = await userModel.findById(userId).select('-password');
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Delete sensitive data from doctor data
      delete docData.slots_booked; // Exclude slots_booked for the response
  
      // Create appointment data
      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount: docData.fees,
        slotDate,
        slotTime,
        date: Date.now(),
      };
  
      // Save the new appointment
      const newAppointment = new appointmentModel(appointmentData);
      await newAppointment.save();
  

      
      try {
      await doctorModel.findByIdAndUpdate(
            docId,
            { $set: { slots_booked } },
            { new: true }
        );
        // console.log("Updated Document:", updatedDoc);
    } catch (error) {
        console.error("Error updating document:", error);
    }
      res.json({ success: true, message: "Appointment booked" });
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  

  // Api to get user appointments for frontend my appointment page
  const listAppointment = async (req, res) => {
    try {
      const { userId } = req.body;
      const appointments = await appointmentModel.find({ userId})

      res.json({ success: true, appointments });
    }catch (error) {
 console.log(error);
 res.json({ success: false, message: error.message });
 
      }
  }

  // Api to cancel appointment
  const cancelAppointment = async (req, res) => {
    try {
      const { userId, appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
    
      if (appointmentData.userId !== userId) {
        return res.json({ success: false, message: "Unauthorized user" });
      }
      
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

      // relesing doctor slot
      const {docId, slotDate, slotTime} = appointmentData

      const doctorData = await doctorModel.findById(docId)

      
      let slots_booked = doctorData.slots_booked
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
      
      
      

      res.json({ success: true, message: "Appointment cancelled" });
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
      
    }
  }

  const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_KEY_SECRET
  })
  // Api to make payment using razorpay
  const paymentRazorpay = async (req, res)=>{
    try {
const {appointmentId} = req.body;
const appointmentData = await appointmentModel.findById(appointmentId);

if(!appointmentData || appointmentData.cancelled){
    return res.json({success: false, message: "Appointment cancelled or not found"})
}
// creating option for razorpay payment
const option = {
  amount: appointmentData.amount * 100, // amount in the smallest currency unit (hundredth of a rupee)
  currency: "INR",
  receipt: appointmentId,// auto capture the payment
}
// creation of an order
const order = await razorpayInstance.orders.create(option)

res.json({success: true, order})
  }catch (error) {
    console.log(error);
    res.json({success: false, 
      message: error.message });
    
  }
}
export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay}