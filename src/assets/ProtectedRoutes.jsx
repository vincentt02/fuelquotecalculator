import { Navigate, Outlet } from "react-router-dom"
import Login from "./Login"

const isAuthenticated = false;

const ProtectedRoutes = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/>
}

export default ProtectedRoutes