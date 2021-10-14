"use strict";
// See more at https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus;
(function (httpStatus) {
    httpStatus[httpStatus["CONTINUE"] = 100] = "CONTINUE";
    httpStatus[httpStatus["OK"] = 200] = "OK";
    httpStatus[httpStatus["CREATED"] = 201] = "CREATED";
    httpStatus[httpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    httpStatus[httpStatus["MULTIPLE_CHOICE"] = 300] = "MULTIPLE_CHOICE";
    httpStatus[httpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpStatus[httpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpStatus[httpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    httpStatus[httpStatus["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    httpStatus[httpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    httpStatus[httpStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    httpStatus[httpStatus["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(httpStatus || (httpStatus = {}));
exports.default = httpStatus;
