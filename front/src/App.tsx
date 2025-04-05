import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {  
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-xl">Carregando...</p>
    </div>
  )

  const pathsWithoutNavbar = ['/login', '/signup'];
  const hideNavBar = pathsWithoutNavbar.includes(location.pathname);  

  return (
    <div className="flex flex-col h-full">
      {!hideNavBar && !isCheckingAuth && <Navbar />}

      <Routes>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        
        {authUser && (
          <>
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/profile" element={<ProfilePage />} /> 
            <Route path="*" element={<NotFoundPage />} /> 
          </>
        )}

        {!authUser && !isCheckingAuth && (
          <Route path="*" element={<Navigate to={'/login'} />} /> 
        )}
      </Routes>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
