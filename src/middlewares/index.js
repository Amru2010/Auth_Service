const { validateUserAuth, validateIsAdminRequest } = require("./auth-request-validator");

module.exports={
    authValidator:validateUserAuth,
    validateIsAdminRequest,
}