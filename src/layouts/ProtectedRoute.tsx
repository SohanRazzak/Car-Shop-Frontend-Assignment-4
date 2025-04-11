import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router";

type Props = {
    children: ReactNode
}

const ProtectedRoute = ({children}: Props) => {
    const token = useAppSelector(selectCurrentToken);

    if(!token){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children
};

export default ProtectedRoute;