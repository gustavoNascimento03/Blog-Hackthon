import { Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Feed } from "../Pages/Feed";
import { NewPost } from "../Pages/NewPost";
import { Perfil } from "../Pages/Perfil";
import { PostDetails } from "../Pages/PostDetails";
import { EditPost } from "../pages/EditPost";
import { InviteUser } from "../Pages/InviteUser";
import { Ranking } from "../pages/Ranking";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/invite" element={<InviteUser />} />
            <Route path="/ranking" element={<Ranking />} />
        </Routes>
    );
}
