import { useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom'

export default function PublicRoute() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    return user ? navigate('/') : <Outlet/>;
}