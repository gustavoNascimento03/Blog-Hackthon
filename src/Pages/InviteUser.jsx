import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { UserPlus, Mail, User } from "lucide-react";
import api from "../services/api";

export function InviteUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("aluno");
    const [message, setMessage] = useState("");

    async function handleInvite(e) {
        e.preventDefault();
        setMessage("");

        try {
            await api.post("/auth/invite", {
                name,
                email,
                role,
            });

            setMessage("✅ Usuário convidado com sucesso! Senha padrão: 123");
            setName("");
            setEmail("");
        } catch (error) {
            console.error(error);
            setMessage(
                "❌ Erro: " + (error.response?.data?.msg || "Tente novamente."),
            );
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-16 md:ml-64 p-10 md:p-8 transition-all">
                <div className="max-w-2xl mx-auto">
                    {/* Título responsivo: menor no mobile (text-2xl) */}
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                        <UserPlus className="text-primary w-6 h-6 md:w-8 md:h-8" />
                        Convidar Usuário
                    </h1>

                    {/* Padding interno do card reduzido no mobile (p-5 vs p-8) */}
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                        {message && (
                            <div
                                className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                            >
                                {message}
                            </div>
                        )}

                        <form
                            onSubmit={handleInvite}
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo
                                </label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                                        placeholder="Ex: João da Silva"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail Institucional
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm md:text-base"
                                        placeholder="Ex: joao@escola.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Função no Sistema
                                </label>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole("aluno")}
                                        className={`p-3 md:p-4 rounded-xl border transition-all text-center text-sm md:text-base ${role === "aluno" ? "border-primary bg-blue-50 text-primary font-bold" : "border-gray-200 hover:bg-gray-50"}`}
                                    >
                                        Aluno
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("professor")}
                                        className={`p-3 md:p-4 rounded-xl border transition-all text-center text-sm md:text-base ${role === "professor" ? "border-primary bg-blue-50 text-primary font-bold" : "border-gray-200 hover:bg-gray-50"}`}
                                    >
                                        Professor
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 md:py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-sm md:text-base shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                            >
                                <UserPlus size={20} />
                                Cadastrar Usuário
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
