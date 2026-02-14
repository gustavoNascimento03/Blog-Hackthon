import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Save, Lock, User as UserIcon, Mail, Trophy } from "lucide-react";
import api from "../services/api";

export function Perfil() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userPoints, setUserPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        async function loadUserData() {
            try {
                const response = await api.get("/users/me");
                setName(response.data.name);
                setEmail(response.data.email);
                setUserId(response.data._id);
                setUserPoints(response.data.points || 0);
            } catch (error) {
                console.error("Erro ao carregar perfil", error);
            } finally {
                setLoading(false);
            }
        }
        loadUserData();
    }, []);

    async function handleUpdateProfile(e) {
        e.preventDefault();
        try {
            await api.put(`/users/${userId}`, {
                name,
                email,
                password: password || undefined,
            });

            alert("Perfil e senha atualizados com sucesso!");
            setPassword("");
        } catch (error) {
            alert("Erro ao atualizar perfil.");
        }
    }

    if (loading)
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">
                        Meu Perfil
                    </h1>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        {/* Card de Gamificação */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white mb-8 shadow-lg flex justify-between items-center">
                            <div>
                                <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                                    Sua Pontuação
                                </p>
                                <h2 className="text-4xl font-bold">
                                    {userPoints} XP
                                </h2>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full">
                                <Trophy size={32} />
                            </div>
                        </div>

                        <form
                            onSubmit={handleUpdateProfile}
                            className="space-y-6"
                        >
                            {/* Campo Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <div className="relative">
                                    <UserIcon
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Campo Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Campo Nova Senha */}
                            <div className="pt-4 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-bold text-primary">
                                    Alterar Senha
                                </label>
                                <p className="text-xs text-gray-400 mb-4">
                                    Deixe em branco para manter a senha atual
                                </p>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Digite a nova senha"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                            >
                                <Save size={20} />
                                Salvar Alterações
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
