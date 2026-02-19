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

    if (loading)
        return (
            <div className="p-4 md:p-8 ml-16 md:ml-64">
                Carregando Ranking...
            </div>
        );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            {/* 1. Responsividade da margem: ml-16 no mobile (assumindo sidebar ícones), ml-64 no desktop */}
            <main className="flex-1 ml-16 md:ml-64 p-10 md:p-8 w-full max-w-full overflow-hidden">
                <div className="max-w-4xl mx-auto w-full">
                    <header className="mb-6 md:mb-8">
                        {/* 2. Textos e ícones menores no mobile */}
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
                            <Trophy className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
                            Ranking de Alunos
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 mt-2">
                            Veja quem são os estudantes mais engajados da
                            escola!
                        </p>
                    </header>

                    {/* 3. Container da tabela e overflow horizontal para mobile */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
                        <div className="overflow-x-auto w-full">
                            {/* min-w garante que a tabela crie scroll antes de ficar espremida */}
                            <table className="w-full text-left border-collapse min-w-[400px]">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs md:text-sm uppercase tracking-wider">
                                        {/* 4. Paddings menores no mobile (px-4) e originais no desktop (md:px-8) */}
                                        <th className="px-4 py-3 md:px-8 md:py-4 font-bold whitespace-nowrap">
                                            Posição
                                        </th>
                                        <th className="px-4 py-3 md:px-8 md:py-4 font-bold whitespace-nowrap">
                                            Nome
                                        </th>
                                        <th className="px-4 py-3 md:px-8 md:py-4 font-bold text-right whitespace-nowrap">
                                            Pontuação
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-sm md:text-base">
                                    {ranking.map((aluno, index) => (
                                        <tr
                                            key={aluno._id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 md:px-8 md:py-5">
                                                <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full font-bold">
                                                    {index === 0 ? (
                                                        <Trophy className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                                                    ) : index === 1 ? (
                                                        <Medal className="text-slate-400 w-5 h-5 md:w-6 md:h-6" />
                                                    ) : index === 2 ? (
                                                        <Award className="text-amber-700 w-5 h-5 md:w-6 md:h-6" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 md:px-8 md:py-5 font-medium text-slate-700">
                                                {aluno.name}
                                            </td>
                                            <td className="px-4 py-3 md:px-8 md:py-5 text-right font-bold text-primary whitespace-nowrap">
                                                {aluno.points} XP
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
