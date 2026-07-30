export const errorHandlingMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    const status = err.status ?? (statusCode >= 500 ? 'error' : 'fail');

    res.status(statusCode).json({
        status,
        message: err.message ?? 'Internal Server Error',
    });
};