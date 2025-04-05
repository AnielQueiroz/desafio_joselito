import { create } from "zustand";
import apiClient from "../sdk/client";
import toast from "react-hot-toast";
import type { Login, Profile, Signup, User } from "../sdk/api";

interface AuthState {
    authUser: User | null;
    userProfile: Profile | null;
    isSigningIn: boolean;
    isSigningOut: boolean;
    isLoggingIn: boolean;
    isGettingProfile: boolean;
    isCheckingAuth: boolean;
    login: (data: Login) => Promise<void>;
    signUp: (data: Signup) => Promise<void>;
    getProfile: (id: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    userProfile: null,
    isSigningIn: false,
    isSigningOut: false,
    isLoggingIn: false,
    isGettingProfile: false,
    isCheckingAuth: true,

    login: async (login: Login) : Promise<void> => {
        set({ isLoggingIn: true });
        try {
            const response = await apiClient.login({ login });
            const token = response.token;

            localStorage.setItem("token", token);

            set({ authUser: response.user });
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
            console.log("Login error:", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    signUp: async (signUp: Signup) : Promise<void> => {
        set({ isSigningIn: true });
        try {
            await apiClient.signUp({ signUp });
            toast.success("Cadastro realizado com sucesso.");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer cadastro.";
            toast.error(errorMessage);
            console.log("Signup error:", error);
        } finally {
            set({ isSigningIn: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        const token = localStorage.getItem("token");
        if (!token) {
            set({ authUser: null, isCheckingAuth: false });
            toast.error("Ops, parece que voce não está logado.");
            return;
        }

        try {
            const response = await apiClient.checkAuth({token});
            set({ authUser: response });
        } catch (error) {
            console.log("Check auth error:", error);
            toast.error("Erro ao verificar autenticação.");
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    getProfile: async (id: string) => {
        set({ isGettingProfile: true });
        const token = localStorage.getItem("token");

        try {
            const response = await apiClient.getProfile({ id, token });
            set({ userProfile: response });
        } catch (error) {
            console.log("Get profile error:", error);
            toast.error("Erro ao buscar perfil.");
            set({ userProfile: null });
        } finally {
            set({ isGettingProfile: false });
        }
    },
    logout: async () => {
        set({ isSigningOut: true });
        localStorage.removeItem("token");
        set({ authUser: null, isSigningOut: false });
        toast.success("Logout realizado com sucesso.");
    },
})) 