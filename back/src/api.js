"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.ApiConfig = exports.Unauthorized = exports.UserAlreadyExists = exports.InvalidCredentials = exports.NotFound = exports.Fatal = void 0;
/* eslint-disable */
const node_runtime_1 = require("@sdkgen/node-runtime");
var node_runtime_2 = require("@sdkgen/node-runtime");
Object.defineProperty(exports, "Fatal", { enumerable: true, get: function () { return node_runtime_2.Fatal; } });
class NotFound extends node_runtime_1.SdkgenError {
}
exports.NotFound = NotFound;
class InvalidCredentials extends node_runtime_1.SdkgenError {
}
exports.InvalidCredentials = InvalidCredentials;
class UserAlreadyExists extends node_runtime_1.SdkgenError {
}
exports.UserAlreadyExists = UserAlreadyExists;
class Unauthorized extends node_runtime_1.SdkgenError {
}
exports.Unauthorized = Unauthorized;
class ApiConfig extends node_runtime_1.BaseApiConfig {
    astJson = {
        annotations: {
            "fn.login": [
                {
                    type: "rest",
                    value: {
                        bodyVariable: "login",
                        headers: [],
                        method: "POST",
                        path: "/login",
                        pathVariables: [],
                        queryVariables: []
                    }
                }
            ],
            "fn.signUp": [
                {
                    type: "rest",
                    value: {
                        bodyVariable: "signUp",
                        headers: [],
                        method: "POST",
                        path: "/signup",
                        pathVariables: [],
                        queryVariables: []
                    }
                }
            ],
            "fn.getProfile": [
                {
                    type: "rest",
                    value: {
                        bodyVariable: null,
                        headers: [
                            [
                                "authorization",
                                "token"
                            ]
                        ],
                        method: "GET",
                        path: "/get-profile/{id}",
                        pathVariables: [
                            "id"
                        ],
                        queryVariables: []
                    }
                }
            ],
            "fn.checkAuth": [
                {
                    type: "rest",
                    value: {
                        bodyVariable: null,
                        headers: [
                            [
                                "authorization",
                                "token"
                            ]
                        ],
                        method: "GET",
                        path: "/auth/check",
                        pathVariables: [],
                        queryVariables: []
                    }
                }
            ],
            "error.NotFound": [
                {
                    type: "statusCode",
                    value: 404
                }
            ],
            "error.InvalidCredentials": [
                {
                    type: "statusCode",
                    value: 401
                }
            ],
            "error.UserAlreadyExists": [
                {
                    type: "statusCode",
                    value: 400
                }
            ],
            "error.Unauthorized": [
                {
                    type: "statusCode",
                    value: 401
                }
            ]
        },
        errors: [
            "NotFound",
            "InvalidCredentials",
            "UserAlreadyExists",
            "Unauthorized",
            "Fatal"
        ],
        functionTable: {
            login: {
                args: {
                    login: "Login"
                },
                ret: "AuthPayload"
            },
            signUp: {
                args: {
                    signUp: "Signup"
                },
                ret: "User"
            },
            getProfile: {
                args: {
                    id: "string",
                    token: "string?"
                },
                ret: "Profile"
            },
            checkAuth: {
                args: {
                    token: "string"
                },
                ret: "User"
            }
        },
        typeTable: {
            User: {
                id: "uuid",
                name: "string",
                email: "string"
            },
            Profile: {
                id: "uuid",
                name: "string",
                email: "string",
                createdAt: "datetime",
                updatedAt: "datetime"
            },
            Login: {
                email: "string",
                password: "string"
            },
            Signup: {
                name: "string",
                email: "string",
                password: "string"
            },
            AuthPayload: {
                user: "User",
                token: "string"
            },
            ValidToken: {
                valid: "bool",
                message: "string"
            }
        }
    };
}
exports.ApiConfig = ApiConfig;
exports.api = new ApiConfig();
