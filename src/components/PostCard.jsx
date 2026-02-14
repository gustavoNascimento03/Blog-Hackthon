import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
    const navigate = useNavigate();

    // Cores dinâmicas baseadas na categoria vinda da API
    const categoryColors = {
        aviso: "bg-amber-100 text-amber-700",
        material: "bg-blue-100 text-blue-700",
        duvida: "bg-purple-100 text-purple-700",
        evento: "bg-emerald-100 text-emerald-700",
    };

    return (
        <div
            // O onClick deve ser uma propriedade DENTRO da tag div
            onClick={() => navigate(`/posts/${post._id}`)}
            // Todas as classes de estilo devem ficar em um único className
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4 flex flex-col hover:shadow-md transition-all cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2">
                <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        categoryColors[post?.category] ||
                        "bg-gray-100 text-gray-600"
                    }`}
                >
                    {post?.category || "Geral"}
                </span>

                {/* Data de criação com verificação de segurança */}
                <span className="text-[10px] text-gray-400">
                    {post?.createdAt
                        ? new Date(post.createdAt).toLocaleDateString("pt-BR")
                        : ""}
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">
                {post?.title}
            </h3>

            {/* Adicionei 'line-clamp-3' para limitar o texto a 3 linhas no card */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {post?.content}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                    Professor
                </span>
                <p className="text-sm font-semibold text-primary">
                    {post?.author?.name || "Coordenação"}
                </p>
            </div>
        </div>
    );
}
