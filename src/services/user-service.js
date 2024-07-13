const {UserRepository}=require("../repository/index");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const {JWT_KEY}= require('../config/serverConfig') 

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try {
             const user= await this.userRepository.create(data);
             return user;
        } catch (error) {
            console.log(`Something went wrong in User service layer`);  
            throw {error};
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log(`Something went wrong in Token Creation`);  
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log(`Something went wrong in Token Verification`,error);  
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log(`Something went wrong in Password Verification`,error);  
            throw {error};
        }
    }

    async signIn(email, plainPassword){
        try {
            //step 1-> check for user through email
            const user=await this.userRepository.getUserByEmail(email);
            console.log(user);
            //step 2-> validate the password
            const passwordMatch=this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw{error:"Incorrect Password"};
            }
            //step 3-> If passwords match then create new Token (with only email and id not password) and send it to the user
            const newJWT=this.createToken({email:user.email, id:user.id});
            return newJWT;
        } catch (error) {
            console.log(`Something went wrong in sign-in process`, error);  
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token); //return {email: , id: , iat: , exp:} 
            if(!response){ 
                throw {error:"Invalid Token"};
            }
            const user=await this.userRepository.getById(response.id);
            if(!user){ //just incase user got token after signup but later he deleted his id but still has token as it has not expired
                throw {error:"User with given token does not exist"}
            }
            return user.id;
        } catch (error) {
            console.log(`Something went wrong in auth process`);  
            throw error;
        }
    }

}

module.exports=UserService;