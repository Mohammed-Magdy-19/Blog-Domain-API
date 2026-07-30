export const errorHandlingMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode ?? err.status ?? 500;
    let message = err.message ?? 'Internal Server Error';

    // ---- Mongoose: validation error ----
    if (err.name === 'ValidationError' && err.errors) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(', ');
    }

    // ---- Mongoose: invalid ObjectId / bad cast ----
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // ---- mongodb driver: invalid ObjectId string, e.g. `new ObjectId(id)` ----
    else if (err.name === 'BSONError') {
        statusCode = 400;
        message = 'Invalid id format';
    }

    // ---- MongoDB: duplicate key (unique index) ----
    else if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue ?? {})[0];
        message = field
            ? `Duplicate value for field: ${field}`
            : 'Duplicate field value';
    }

    // ---- jsonwebtoken: invalid signature/malformed token ----
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    // ---- jsonwebtoken: expired token ----
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired, please log in again';
    }

    // ---- zod: schema validation error ----
    else if (err.name === 'ZodError') {
        statusCode = 400;
        message = err.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
    }

    // ---- express 5 / body-parser: malformed JSON in request body ----
    else if (err.type === 'entity.parse.failed') {
        statusCode = 400;
        message = 'Malformed JSON in request body';
    }

    const status = statusCode >= 500 ? 'error' : 'fail';

    if (statusCode >= 500) {
        console.error(err); // full real error, always logged
    }

    res.status(statusCode).json({
        status,
        message,
    });
};