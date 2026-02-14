import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Trophy, Medal, Award } from "lucide-react";
import api from "../services/api";

export function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRanking() {
            try {
                const response = await api.get("/score/ranking");
                setRanking(response.data);
            } catch (error) {
                console.error("Erro ao carregar ranking", error);
            } finally {
                setLoading(false);
            }
        }
        loadRanking();
    }, []);

    if (loading) return <div className="p-8">Carregando Ranking...</div>;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Trophy className="text-amber-500" size={32} />
                            Ranking de Alunos
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Veja quem são os estudantes mais engajados da
                            escola!
                        </p>
                    </header>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                                    <th className="px-8 py-4 font-bold">
                                        Posição
                                    </th>
                                    <th className="px-8 py-4 font-bold">
                                        Nome
                                    </th>
                                    <th className="px-8 py-4 font-bold text-right">
                                        Pontuação
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {ranking.map((aluno, index) => (
                                    <tr
                                        key={aluno._id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold">
                                                {index === 0 ? (
                                                    <Trophy className="text-amber-500" />
                                                ) : index === 1 ? (
                                                    <Medal className="text-slate-400" />
                                                ) : index === 2 ? (
                                                    <Award className="text-amber-700" />
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-medium text-slate-700">
                                            {aluno.name}
                                        </td>
                                        <td className="px-8 py-5 text-right font-bold text-primary">
                                            {aluno.points} XP
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
