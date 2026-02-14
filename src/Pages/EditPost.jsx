import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export function EditPost() {
    const { id } = useParams(); // Pega o ID da URL
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
            navigate(`/posts/${id}`); // Volta para a tela de detalhes
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao salvar alterações.");
        }
    }

    if (loading) return <div className="p-8">Carregando dados...</div>;

    return (
        <div className="min-h-screen bg-background-light">
            <Sidebar />
            <main className="ml-64 p-8">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => navigate(`/posts/${id}`)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6"
                    >
                        <ArrowLeft size={20} />
                        Cancelar Edição
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-2xl font-bold text-gray-800 font-display mb-6">
                            Editar Publicação
                        </h1>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
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
