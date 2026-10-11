function errorHandler(err, req, res, next) {
    console.error(err);

    // Mongoose Validation Error (returns structured JSON, not raw Mongoose error)
    if (err.name === "ValidationError") {
        const errors = {};

        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors
        });
    }

    // Invalid MongoDB ID format
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });
    }

    // Other unhandled errors
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}

module.exports = errorHandler;
