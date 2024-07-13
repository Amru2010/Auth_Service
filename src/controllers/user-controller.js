const {UserService}=require("../services/index");

const userService=new UserService();
const create=async (req,res)=>{
    try {
        const user=await userService.create({
            email:req.body.email,
            password:req.body.password, 
        });
        return res.status(201).json({
            data:user,
            success:true,
            message:"Created user successfully",
            error:{}
        });
    } catch (error) {
        console.log(`Something went wrong at User controller layer ${error}`);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Failed to create user",
            error:error
        });
    }
}

const signIn = async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data:response,
            success:true,
            message:"SignIn successful",
            error:{}
        });
    } catch (error) {
        console.log(`Something went wrong at User controller layer`);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Failed to signIn",
            error:error
        });
    }
}

module.exports={
    create,
    signIn,
}