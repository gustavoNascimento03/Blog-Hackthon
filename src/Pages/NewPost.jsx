import { useState } from "react"; // Adicionado
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Certifique-se de que o caminho está correto

export function NewPost() {
    const navigate = useNavigate();

    // Estados para armazenar os dados do formulário
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            // Envia para a rota de criação definida no seu routes.js
            await api.post("/posts", {
                title,
                category,
                content,
            });

            console.log("Post criado com sucesso!");
            navigate("/feed");
        } catch (error) {
            console.error("Erro ao criar post:", error);
            alert(
                "Erro ao publicar. Verifique se você está logado como professor.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background-light">
            <Sidebar />

            <main className="ml-64 p-8">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => navigate("/feed")}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Voltar para o Feed
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-2xl font-bold text-gray-800 font-display mb-6">
                            Criar nova publicação
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-body">
                                    Título da postagem
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ex: Dicas para a prova de amanhã..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-body">
                                    Categoria
                                </label>
                                <select
                                    required
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body bg-white"
                                >
                                    <option value="">
                                        Selecione um tópico...
                                    </option>
                                    <option value="aviso">Aviso Geral</option>
                                    <option value="material">
                                        Material de Aula
                                    </option>
                                    <option value="duvida">Dúvida</option>
                                    <option value="evento">Evento</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-body">
                                    Conteúdo
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Escreva sua mensagem aqui..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] font-display shadow-lg shadow-blue-500/30"
                                >
                                    {loading ? "Publicando..." : "Publicar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
