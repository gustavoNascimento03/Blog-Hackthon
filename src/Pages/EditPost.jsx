import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // 1. Carregar os dados atuais do post
    useEffect(() => {
        async function loadPost() {
            try {
                const response = await api.get(`/posts/${id}`);
                setTitle(response.data.title);
                setCategory(response.data.category);
                setContent(response.data.content);
            } catch (error) {
                alert("Erro ao carregar o post.");
                navigate("/feed");
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [id, navigate]);

    // 2. Enviar a atualização
    async function handleUpdate(event) {
        event.preventDefault();
        try {
            await api.put(`/posts/${id}`, {
                title,
                category,
                content,
            });

            alert("Post atualizado com sucesso!");
            navigate(`/posts/${id}`);
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao salvar alterações.");
        }
    }

    if (loading)
        return <div className="p-8 ml-16 md:ml-64">Carregando dados...</div>;

    return (
        <div className="min-h-screen bg-background-light">
            <Sidebar />

            <main className="ml-16 md:ml-64 p-10 md:p-8 transition-all duration-300">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => navigate(`/posts/${id}`)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 md:mb-6"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm md:text-base">
                            Cancelar Edição
                        </span>
                    </button>

                    {/* Card com padding reduzido no mobile (p-5) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-8">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 font-display mb-4 md:mb-6">
                            Editar Publicação
                        </h1>

                        <form
                            onSubmit={handleUpdate}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Categoria
                                </label>
                                <select
                                    required
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white text-sm md:text-base"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="aviso">Aviso Geral</option>
                                    <option value="material">
                                        Material de Aula
                                    </option>
                                    <option value="duvida">Dúvida</option>
                                    <option value="evento">Evento</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Conteúdo
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary resize-none text-sm md:text-base"
                                />
                            </div>

                            <div className="pt-2 md:pt-4 flex justify-end">
                                {/* Botão full width no mobile para facilitar o clique */}
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
