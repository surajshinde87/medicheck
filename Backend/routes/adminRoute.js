import express from 'express';
import { addDoctor, adminLogin, allDoctors,adminDashboard, appointmentAdmin, appointmentCancel } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/authAdmin.js';
import { changeAvailability } from  '../controllers/doctorContoller.js'


const adminRouter = express.Router();

adminRouter.post('/add-doctor', adminAuth, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.post('/all-doctors', allDoctors);
adminRouter.post('/change-availability', changeAvailability); // Ensure handler is properly defined
adminRouter.get('/appointments', appointmentAdmin)
adminRouter.post('/cancel-appointment', appointmentCancel)
adminRouter.get('/dashboard', adminDashboard)

export default adminRouter;
