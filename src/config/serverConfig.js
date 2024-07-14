const dotenv=require('dotenv');
const bcrypt=require('bcrypt');

dotenv.config();

module.exports={
    PORT:process.env.PORT,
    SALT:bcrypt.genSaltSync(10),
    JWT_KEY:process.env.JWT_KEY,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    VERIFICATION_LINK_PREFIX:process.env.VERIFICATION_LINK_PREFIX,
}