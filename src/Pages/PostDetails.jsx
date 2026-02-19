import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft, Trash2, Edit } from "lucide-react";
import api from "../services/api";

export function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const userRole = localStorage.getItem("userRole");
    const isProfessor = userRole === "professor";

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Erro ao carregar post", error);
                alert("Post não encontrado.");
                navigate("/feed");
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [id, navigate]);

    useEffect(() => {
        async function registerReading() {
            try {
                const userRole = localStorage.getItem("userRole");
                if (userRole === "aluno") {
                    const response = await api.post(`/score/read/${id}`);
                    if (response.data.msg.includes("ganhou")) {
                        console.log(response.data.msg);
                    }
                }
            } catch (error) {
                console.error("Erro ao computar pontos", error);
            }
        }

        if (post) {
            registerReading();
        }
    }, [id, post]);

    async function handleDelete() {
        const confirm = window.confirm(
            "Tem certeza que deseja excluir este post?",
        );
        if (confirm) {
            try {
                await api.delete(`/posts/${id}`);
                alert("Post excluído com sucesso!");
                navigate("/feed");
            } catch (error) {
                alert("Erro ao excluir post. Verifique se você é o autor.");
            }
        }
    }

    function handleEdit() {
        navigate(`/posts/edit/${id}`);
    }

    const categoryColors = {
        aviso: "bg-amber-100 text-amber-700",
        material: "bg-blue-100 text-blue-700",
        duvida: "bg-purple-100 text-purple-700",
        evento: "bg-emerald-100 text-emerald-700",
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />

            <main className="ml-16 md:ml-64 p-10 md:p-8 transition-all duration-300">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => navigate("/feed")}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 md:mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm md:text-base">
                            Voltar para o Feed
                        </span>
                    </button>

                    {post && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Header do Post: Padding reduzido no mobile (p-5) */}
                            <div className="p-5 md:p-8 border-b border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                                    <span
                                        className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category] || "bg-gray-100"}`}
                                    >
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {new Date(
                                            post.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Título responsivo (menor no mobile) */}
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-display break-words">
                                    {post.title}
                                </h1>

                                <p className="text-gray-500 text-sm">
                                    Publicado por{" "}
                                    <span className="text-primary font-semibold">
                                        {post.author?.name || "Professor"}
                                    </span>
                                </p>
                            </div>

                            {/* Conteúdo: Padding reduzido no mobile (p-5) */}
                            <div className="p-5 md:p-8">
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                                    {post.content}
                                </div>
                            </div>

                            {isProfessor && (
                                <div className="bg-gray-50 p-4 md:p-6 flex justify-end gap-3 md:gap-4 border-t border-gray-100">
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-3 py-2 md:px-4 text-sm md:text-base text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                                    >
                                        <Edit size={18} />
                                        Editar
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 px-3 py-2 md:px-4 text-sm md:text-base text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors"
                                    >
                                        <Trash2 size={18} />
                                        Excluir
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
