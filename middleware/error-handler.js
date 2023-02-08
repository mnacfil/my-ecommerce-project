const errorHandler = (err, req, res, next) => {
    console.log("ERROR from error handler middleware");
    console.log(err);
}

module.exports = errorHandler;