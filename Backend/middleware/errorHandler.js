export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message }); // Set a generic error message
  console.error(err); // Log the error for debugging
};
