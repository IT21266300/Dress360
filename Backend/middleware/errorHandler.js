// export const errorHandler = (err, req, res, next) => {
//   // res.status(500).json({ error: err.message });
//   res.status(err.status || 500).json({ error: err.message });
//   console.error(err);
// };

export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
  console.error(err);
};