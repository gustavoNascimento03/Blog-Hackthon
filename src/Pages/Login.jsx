import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import api from "../services/api";

export function Login() {
    const navigate = useNavigate();

    // Estados para armazenar os dados do formulário
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado para UX (loading, erro e visibilidade da senha)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1. Envia email e senha para o backend
            // console.log("Dados enviados:", { email, password });
            const response = await api.post("/auth/login", { email, password });

            // 2. Pega o token que o backend devolveu
            // (Supondo que o backend devolva { token: "...", user: {...} })
            const { token, name } = response.data;

            // 3. Salva no navegador para o usuário não precisar logar de novo
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", name); // Opcional, para mostrar na sidebar

            // 4. Configura o axios para enviar esse token em todas as próximas requisições
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            console.log("Login realizado com sucesso!");
            navigate("/feed");

            const userRole = response.data.user?.role || response.data.role;

            if (userRole) {
                localStorage.setItem("userRole", userRole);
            }

            api.defaults.headers.common["Authorization"] =
                `Bearer ${response.data.token}`;
            navigate("/feed");
            
        } catch (err) {
            console.error(err);
            // Tenta mostrar a mensagem de erro que veio do backend, se houver
            const mensagemErro =
                err.response?.data?.message || "Email ou senha incorretos.";
            setError(mensagemErro);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Cabeçalho do Card */}
                <div className="bg-primary p-8 text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Bem-vindo
                    </h1>
                    <p className="text-blue-100 font-body">
                        Entre na plataforma de ensino
                    </p>
                </div>

                {/* Formulário */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Input de Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 font-body">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="professor@escola.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Input de Senha */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 font-body">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body text-gray-600"
                                />

                                {/* Botão de ver senha */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-body border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Botão de Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-display shadow-lg shadow-blue-500/30"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Entrando...
                                </span>
                            ) : (
                                "Acessar Sistema"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500 font-body">
                        Esqueceu sua senha?{" "}
                        <a
                            href="#"
                            className="text-primary hover:underline font-medium"
                        >
                            Recuperar acesso
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
