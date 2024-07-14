const {User}=require("../models/index");

class UserRepository{

    async create(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }    
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId,
                }
            });
            return true;
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }    
    }
    async updateUserVerified(userId){
        try {
            const user=await User.findByPk(userId);
            user.isVerified=true;
            await user.save();
            return user;
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }
    }
    async getById(userId){
        try {
            const user=await User.findByPk(userId,{
                attributes:['email','id'],
            });
            return user;
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }
    }

    async getUserByEmail(userEmail){
        try {
            const user=await User.findOne({
                where:{
                    email:userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw {error};
        }
    }

    async getAll(){
        try {
            
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }
    }

}

module.exports=UserRepository;