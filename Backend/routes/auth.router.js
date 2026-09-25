import express from 'express'
import {signUp,Login,logOut} from '../controllers/auth.controllers.js'
const router =express.Router();

router.post("/signup",signUp);
router.post("/signin",Login);
router.get("/logout",logOut);

export default router;