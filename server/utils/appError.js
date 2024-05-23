class createError extends Error {
  constructor(message, statusCode) {
    super(message);
    console.log("errCode-->", statusCode, message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4" ? "fail" : "error");

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = createError;
// class AppError extends Error {
//   constructor(statusCode, message) {
//     console.log("errCode-->", statusCode, message);
//     super(message);
//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = function createError(statusCode, message) {
//   return new AppError(statusCode, message);
// };
