const AppError= require('./error-handler');
const {StatusCodes}= require('http-status-codes');

class ValidationError extends AppError{
    constructor(errorObj){
        let errorName=errorObj.name;
        let explanation=[];
        errorObj.errors.forEach(err => {
            explanation.push(err.message);
        });
        super(//name..message..explanation..statusCode  
            errorName,
            "Not able to validate the data sent in the request",
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }   
}

module.exports=ValidationError;