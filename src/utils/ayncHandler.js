const asyncHandler = (requserHandler) => {
    return (req, res, next) => {
        Promise.resolve(requserHandler(req, res, next)).
            catch((err) => next(err))
    }
}


export {asyncHandler}

