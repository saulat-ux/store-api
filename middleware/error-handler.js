const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({msg:'sometinhg went wrong try again'})
}

module.exports = errorHandlerMiddleware