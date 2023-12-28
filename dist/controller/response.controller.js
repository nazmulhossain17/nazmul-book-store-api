"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const errorResponse = (res, { statusCode = 500, message = "Internal Server Error" }) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.errorResponse = errorResponse;
const successResponse = (res, { statusCode = 200, message = "Success", payload = {} }) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload,
    });
};
exports.successResponse = successResponse;
