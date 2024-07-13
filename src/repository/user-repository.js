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
    async update(){
        try {
            
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
        }
    }
    async get(){
        try {
            
        } catch (error) {
            console.log(`Something went wrong in User Repository Layer`);
            throw{error};
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