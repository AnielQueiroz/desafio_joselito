import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const { authUser, userProfile, isGettingProfile, getProfile } = useAuthStore();

    useEffect(() => {
        if (authUser) {
            getProfile(authUser.id);
        }
    }, [authUser, getProfile]);

    if (isGettingProfile && !userProfile) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-xl">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center pt-28 sm:pt-16">
            <h1 className="text-2xl font-bold mb-4">Perfil</h1>
            <div>
                <p>Nome: {userProfile?.name}</p>
                <p>Email: {userProfile?.email}</p>
                <p>Perfil criado em: {userProfile?.createdAt?.toLocaleDateString()}</p>
                <p>Ultima alteração: {userProfile?.updatedAt?.toLocaleDateString()}</p>
            </div>
        </div>
    )
};

export default ProfilePage;