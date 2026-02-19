import { useNavigate } from "react-router-dom";
import { Pencil, LogOut, Home, User, UserPlus, Trophy } from "lucide-react";

export function Sidebar() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <aside className="w-20 md:w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 p-4 md:p-6 flex flex-col transition-all duration-300 z-50">
            {/* Título oculto no mobile, visível a partir do tamanho 'md' */}
            <div className="mb-8 hidden md:block">
                <h1 className="text-2xl font-display font-bold text-primary whitespace-nowrap overflow-hidden">
                    Escola App
                </h1>
            </div>

            {/* mt-4 no mobile para compensar a ausência do título e não colar no topo */}
            <nav className="flex-1 space-y-2 mt-4 md:mt-0">
                <button
                    onClick={() => navigate("/feed")}
                    title="Feed de Notícias"
                    className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <Home size={20} className="min-w-[20px]" />
                    <span className="hidden md:block whitespace-nowrap">
                        Feed de Notícias
                    </span>
                </button>

                {/*BOTÃO: Meu Perfil */}
                <button
                    onClick={() => navigate("/perfil")}
                    title="Meu Perfil"
                    className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <User size={20} className="min-w-[20px]" />
                    <span className="hidden md:block whitespace-nowrap">
                        Meu Perfil
                    </span>
                </button>

                <button
                    onClick={() => navigate("/ranking")}
                    title="Ranking Geral"
                    className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <Trophy size={20} className="min-w-[20px]" />
                    <span className="hidden md:block whitespace-nowrap">
                        Ranking Geral
                    </span>
                </button>
            </nav>

            <div className="pt-6 border-t border-gray-100 space-y-2">
                {userRole === "professor" && (
                    <>
                        <button
                            onClick={() => navigate("/new-post")}
                            title="Criar Publicação"
                            className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                        >
                            <Pencil size={20} className="min-w-[20px]" />
                            <span className="hidden md:block whitespace-nowrap">
                                Criar Publicação
                            </span>
                        </button>

                        <button
                            onClick={() => navigate("/invite")}
                            title="Convidar Usuário"
                            className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                        >
                            <UserPlus size={20} className="min-w-[20px]" />
                            <span className="hidden md:block whitespace-nowrap">
                                Convidar Usuário
                            </span>
                        </button>
                    </>
                )}
                <button
                    onClick={handleLogout}
                    title="Sair"
                    className="flex items-center justify-center md:justify-start gap-0 md:gap-3 text-red-500 hover:bg-red-50 w-full p-3 rounded-lg transition-colors"
                >
                    <LogOut size={20} className="min-w-[20px]" />
                    <span className="hidden md:block whitespace-nowrap">
                        Sair
                    </span>
                </button>
            </div>
        </aside>
    );
}
