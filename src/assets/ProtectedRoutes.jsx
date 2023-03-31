import { Navigate, Outlet } from "react-router-dom"
import {token, Login} from "./Login"


const ProtectedRoutes = () => {
    let isAuthenticated = token ? true : false
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes