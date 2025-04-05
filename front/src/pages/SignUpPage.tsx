import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const { isSigningIn, signUp } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<{ name: string; email: string; password: string }>({
        name: "",
        email: "",
        password: "",
    });

    const validateForm = () => {
		if (!formData.name.trim()) return toast.error("Preencha seu nome.");
		if (!formData.email.trim()) return toast.error("Preencha seu email.");
		if (!/\S+@\S+\.\S+/.test(formData.email))
			return toast.error("Email inválido.");
		if (!formData.password) return toast.error("Preencha sua senha.");
		if (formData.password.length < 6)
			return toast.error("Senha deve ter pelo menos 6 caracteres.");

		return true;
	};


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Preencha todos os campos.");
            return;
        }

        const allValidated = validateForm();

        if (allValidated === true) {
            await signUp(formData)
            navigate("/login");
        };
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white w-[30%] p-8 rounded-lg shadow-md">
                <h1 className="text-2xl text-gray-700 font-bold mb-4">Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-gray-700">
                        <label htmlFor="name" className="block text-sm font-medium">Nome</label>
                        <input
                            id="name"
                            type="text"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Digite seu nome"
                        />
                    </div>  
                    <div className="mb-4 text-gray-700">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 p-2 w-full border rounded-md "
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Digite seu email"
                        />
                    </div>  
                    <div className="mb-4 text-gray-700">
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
                        disabled={isSigningIn}
                        type="submit"
                        className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {isSigningIn ? "Cadastrando..." : "Cadastrar"}
                    </button>
                    <p className="mt-4 text-sm text-gray-700">
                        Ja possui uma conta? <a href="/login" className="text-blue-500 hover:text-blue-600">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;