import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar"; // Assumindo que a sidebar já está responsiva
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
        <div className="flex min-h-screen bg-slate-50 overflow-hidden">
            <Sidebar />

            {/* Ajuste principal: ml-16 (ou ml-20 dependendo do tamanho exato da sua sidebar mobile) e md:ml-64 para desktop. Paddings responsivos p-4 md:p-8 */}
            <main className="flex-1 ml-16 md:ml-64 p-10 md:p-8 transition-all duration-300 w-full">
                <div className="max-w-2xl mx-auto w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">
                        Meu Perfil
                    </h1>

                    {/* Paddings menores no mobile (p-5) e normais no desktop (md:p-8) */}
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                        {/* Card de Gamificação responsivo */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 md:p-6 rounded-2xl text-white mb-6 md:mb-8 shadow-lg flex flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-blue-100 text-xs md:text-sm font-medium uppercase tracking-wider mb-1">
                                    Sua Pontuação
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    {userPoints} XP
                                </h2>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full shrink-0">
                                <Trophy size={28} className="md:w-8 md:h-8" />
                            </div>
                        </div>

                        <form
                            onSubmit={handleUpdateProfile}
                            className="space-y-5 md:space-y-6"
                        >
                            {/* Campo Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <div className="relative">
                                    <UserIcon
                                        className="absolute left-3 top-3.5 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
                                        className="absolute left-3 top-3.5 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            {/* Campo Nova Senha */}
                            <div className="pt-5 border-t border-gray-100">
                                <label className="block text-sm font-medium text-blue-600 mb-1 font-bold">
                                    Alterar Senha
                                </label>
                                <p className="text-xs text-gray-400 mb-4">
                                    Deixe em branco para manter a senha atual
                                </p>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-3.5 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Digite a nova senha"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-sm md:text-base mt-2"
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
