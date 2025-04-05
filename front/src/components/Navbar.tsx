import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a href="/home" className="btn btn-ghost text-xl">Sistema</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                <button type="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </button>
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a href="/profile">Perfil</a></li>
                    <li>
                        <button type="button" onClick={() => handleLogout()}>Sair</button>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;