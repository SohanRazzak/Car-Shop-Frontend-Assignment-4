import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router";

type Props = {
    children: ReactNode
}

const ProtectedRoute = ({children}: Props) => {
    const token = useAppSelector(useCurrentToken);

    if(!token){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children
};

export default ProtectedRoute;