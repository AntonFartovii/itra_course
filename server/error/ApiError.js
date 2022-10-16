export class ApiError extends Error {
    constructor(status, message, errors = []) {
        super( message );
        this.status = status
        this.errors = errors
    }

    static unAuthorizedError() {
        new ApiError(401, 'User is not authorized')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

