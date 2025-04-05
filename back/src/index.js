"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_runtime_1 = require("@sdkgen/node-runtime");
const api_1 = require("./api");
const authController_1 = require("./controllers/authController");
const profileController_1 = require("./controllers/profileController");
const signUpController_1 = require("./controllers/signUpController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const checkAuthController_1 = require("./controllers/checkAuthController");
api_1.api.use(async (ctx, next) => {
    const publicRoutes = ['login', 'signUp'];
    if (!publicRoutes.includes(ctx.request.name)) {
        let token = "";
        if (ctx.request.headers?.authorization) {
            token = ctx.request.headers?.authorization;
        }
        else if (ctx.request.args?.token) {
            token = ctx.request.args?.token;
        }
        await (0, authMiddleware_1.authMiddleware)({ token });
    }
    return await next();
});
api_1.api.fn.login = async (ctx, { login: { email, password } }) => {
    return await (0, authController_1.loginController)({ email, password });
};
api_1.api.fn.signUp = async (ctx, { signUp: { name, email, password } }) => {
    return await (0, signUpController_1.signUpController)({ name, email, password });
};
api_1.api.fn.getProfile = async (ctx, { id }) => {
    return await (0, profileController_1.getProfileController)(id);
};
api_1.api.fn.checkAuth = async (ctx) => {
    return await (0, checkAuthController_1.checkAuthController)(ctx.request.args.token);
};
const server = new node_runtime_1.SdkgenHttpServer(api_1.api, {});
server.listen(8000);
