// src/pages/Feed.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { Sidebar } from "../components/Sidebar";
import { PostCard } from "../components/PostCard";

export function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await api.get("/posts");
                setPosts(response.data);
            } catch (err) {
                console.error("Erro ao carregar o feed:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* 1. Sidebar Fixa */}
            <Sidebar />

            {/* 2. Área do Conteúdo (Margem à esquerda igual à largura da sidebar) */}
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-3xl font-display font-bold text-slate-900">
                            Mural de Estudos
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Confira as últimas orientações postadas pelos
                            professores.
                        </p>
                    </header>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                // Importante: use o post._id do MongoDB como key
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400">
                                Nenhum conteúdo disponível no momento.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
