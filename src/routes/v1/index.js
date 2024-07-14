const express=require('express');

const UserController=require('../../controllers/user-controller');
const {authValidator}=require('../../middlewares/index');

const router=express.Router();

router.post("/signup",authValidator, UserController.create);
router.post("/signin",authValidator,UserController.signIn);
router.get("/isAuthenticated",UserController.isAuthenticated);
router.get("/verify-email",UserController.verifyEmail);



module.exports=router;