const asyncHandler = (requserHandler) => {
    (req, res, next) => {
        Promise.resolve(requserHandler(req, res, next)).
            catch((err) => next(err))
    }
}


export {asyncHandler}

