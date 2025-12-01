import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    const location = useLocation();

    if(!accessToken){
        return <Navigate to = {'/login'} state={{location}} replace />;
    }
    return (
     <>
         <Navbar />
         <main className="pt-20"> {/* Navbar에 겹치지 않도록 pt-20 추가 권장 */}
                <Outlet />
            </main>
     </>
    );
    
}

export default ProtectedLayout;