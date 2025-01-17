const {User, Role}=require("../models/index");
const ValidationError = require("../utils/validation-error");

class UserRepository{

    async create(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            if(error.name=="SequelizeValidationError"){
                let validationError = new ValidationError(error);
                throw validationError;
            }
            console.log(`Something went wrong in User Repository Layer`);
            throw error;
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

    async isAdmin(userId){
        try {
            const user=await User.findByPk(userId);
            const adminRole=await Role.findOne({
                where:{
                    name:'ADMIN',
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }
    }

}

module.exports=UserRepository;