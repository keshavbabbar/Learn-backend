class ApiError extends Error {
    constructor(
        stateCode,
        message = "something went  wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.stateCode = stateCode
        this.data = null,
        this.message = message,
        this.sucess = false,
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}