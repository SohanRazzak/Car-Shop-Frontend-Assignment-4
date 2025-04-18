import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router";
import { logout, selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/types";

type Props = {
    children: ReactNode;
    role: "admin" | "customer";
};

const ProtectedRoute = ({ children, role }: Props) => {
    const token = useAppSelector(selectCurrentToken);

    let user;

    if (token) {
        user = verifyToken(token);
    }

    const dispatch = useAppDispatch();

    if (role == undefined || role !== (user as TUser)?.role) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;
