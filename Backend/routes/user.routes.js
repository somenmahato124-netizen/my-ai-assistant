import express from 'express'
import isAuth from '../middleware/isAuth.js'
const router=express.Router();
import{getCurrentUser, updateAssistant,askToAssistant}from '../controllers/user.controllers.js'
import upload from '../middleware/multer.js';

router.get("/current",isAuth,getCurrentUser);
router.post('/update',isAuth,upload.single("assistantImage"),updateAssistant)

router.post("/asktoAssistant",isAuth,askToAssistant)
export default router;