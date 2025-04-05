import { SdkgenHttpServer } from "@sdkgen/node-runtime";
import { api } from "./api";
import { loginController } from "./controllers/authController";
import { getProfileController } from "./controllers/profileController";
import { signUpController } from "./controllers/signUpController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { checkAuthController } from "./controllers/checkAuthController";

api.use(async (ctx, next) => {
    const publicRoutes = ['login', 'signUp'];

    if (!publicRoutes.includes(ctx.request.name)) {
        let token = "";
        if (ctx.request.headers?.authorization) {
            token = ctx.request.headers?.authorization;
        } else if (ctx.request.args?.token) {
            token = ctx.request.args?.token as string;
        }
    
        await authMiddleware({ token });
    }    
    
    return await next();
});

api.fn.login = async (ctx, { login: { email, password } }) => {
    return await loginController({ email, password });
};

api.fn.signUp = async (ctx, { signUp: { name, email, password } }) => {
    return await signUpController({ name, email, password });
};

api.fn.getProfile = async (ctx, { id }) => {
    return await getProfileController(id);
};

api.fn.checkAuth = async (ctx) => {
    return await checkAuthController(ctx.request.args.token as string);
};

const server = new SdkgenHttpServer(api, {});
server.listen(8000);