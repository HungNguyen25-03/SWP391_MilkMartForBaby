const errorHandlingMiddleware = (err, req, res, next) => {
  if (Array.isArray(err)) {
    // If the error is an array, respond with the first error's status or a default status
    const status = err[0]?.status || 400;
    return res.status(status).json({ errors: err });
  }

  // If the error is an object, respond with its status or a default status
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
};

module.exports = { errorHandlingMiddleware };
