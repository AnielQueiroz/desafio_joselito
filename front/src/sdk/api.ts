/* eslint-disable */
import { SdkgenError, SdkgenHttpClient } from "@sdkgen/browser-runtime";

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

export class Fatal extends SdkgenError {}

export class ApiClient extends SdkgenHttpClient {
    constructor(baseUrl: string) {
        super(baseUrl, astJson, errClasses);
    }

    login(args: {login: Login}): Promise<AuthPayload> { return this.makeRequest("login", args || {}); }
    signUp(args: {signUp: Signup}): Promise<User> { return this.makeRequest("signUp", args || {}); }
    getProfile(args: {id: string, token?: string | null}): Promise<Profile> { return this.makeRequest("getProfile", args || {}); }
    checkAuth(args: {token: string}): Promise<User> { return this.makeRequest("checkAuth", args || {}); }
}

const errClasses = {
    NotFound,
    InvalidCredentials,
    UserAlreadyExists,
    Unauthorized,
    Fatal
};

const astJson = {
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
} as const;
