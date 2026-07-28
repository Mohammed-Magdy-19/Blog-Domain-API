export const errorHandlingMiddleware = (err, req, res, next) => {
    const status = error.statusCode ?? 500;
    res.status(status).json({ message: err.message });
}