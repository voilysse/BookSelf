import { useLocation, NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/auth/authSlice"

const RequireAuth = () => {
    const user = useSelector(selectCurrentUser)

    return (
        user ? <Outlet /> : <NavLink to="/login"/>
    )
}

export default RequireAuth
