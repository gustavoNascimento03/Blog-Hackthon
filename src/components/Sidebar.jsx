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
        <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-primary">
                    Escola App
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                <button
                    onClick={() => navigate("/feed")}
                    className="flex items-center gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <Home size={20} />
                    <span>Feed de Notícias</span>
                </button>

                {/* NOVO BOTÃO: Meu Perfil */}
                <button
                    onClick={() => navigate("/perfil")}
                    className="flex items-center gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <User size={20} />
                    <span>Meu Perfil</span>
                </button>

                <button
                    onClick={() => navigate("/ranking")}
                    className="flex items-center gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                >
                    <Trophy size={20} />
                    <span>Ranking Geral</span>
                </button>
            </nav>
            <div className="pt-6 border-t border-gray-100">
                {userRole === "professor" && (
                    <>
                        <button
                            onClick={() => navigate("/new-post")}
                            className="flex items-center gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                        >
                            <Pencil size={20} />
                            <span>Criar Publicação</span>
                        </button>

                        <button
                            onClick={() => navigate("/invite")}
                            className="flex items-center gap-3 text-gray-600 hover:text-primary hover:bg-blue-50 w-full p-3 rounded-lg transition-colors"
                        >
                            <UserPlus size={20} />
                            <span>Convidar Usuário</span>
                        </button>
                    </>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-3 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
}
