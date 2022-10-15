import { useAuth } from "./Auth";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const auth = useAuth()
    console.log(auth.user);
    return auth.user ? children : <Navigate to={"/login"} />
}

export default ProtectedRoute;