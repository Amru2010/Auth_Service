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
            err:{}
        });
    } catch (error) {
        console.log(`Something went wrong at User controller layer ${error}`);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Failed to create user",
            err:error
        });
    }
}

module.exports={
    create,
}