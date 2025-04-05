/* eslint-disable */
import { BaseApiConfig, Context, Fatal, SdkgenError } from "@sdkgen/node-runtime";
export { Fatal } from "@sdkgen/node-runtime";

export interface User {
    id: string
    name: string
    email: string
}

export interface Profile {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface Login {
    email: string
    password: string
}

export interface Signup {
    name: string
    email: string
    password: string
}

export interface AuthPayload {
    user: User
    token: string
}

export interface ValidToken {
    valid: boolean
    message: string
}

export class NotFound extends SdkgenError {}

export class InvalidCredentials extends SdkgenError {}

export class UserAlreadyExists extends SdkgenError {}

export class Unauthorized extends SdkgenError {}

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    declare fn: {
        login: (ctx: Context & ExtraContextT, args: {login: Login}) => Promise<AuthPayload>
        signUp: (ctx: Context & ExtraContextT, args: {signUp: Signup}) => Promise<User>
        getProfile: (ctx: Context & ExtraContextT, args: {id: string, token: string | null}) => Promise<Profile>
        checkAuth: (ctx: Context & ExtraContextT, args: {token: string}) => Promise<User>
    }

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
    } as const
}

export const api = new ApiConfig<{}>();
