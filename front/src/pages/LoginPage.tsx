import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.ts";
import toast from "react-hot-toast";

const LoginPage = () => {
    const { login, isLoggingIn } = useAuthStore();

    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Preencha todos os campos.");
            return;
        }
        
        await login(formData);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-700 w-[30%] p-8 rounded-lg shadow-md">
                <h1 className="text-2xl  font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Digite seu email"
                        />
                    </div>  
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Senha</label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button
                        disabled={isLoggingIn}
                        type="submit"
                        className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {isLoggingIn ? "Carregando..." : "Entrar"}
                    </button>
                    <p className="mt-4 text-sm text-gray-700">
                        Ainda não tem conta? <a href="/signup" className="text-blue-500 hover:text-blue-600">Cadastrar</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;