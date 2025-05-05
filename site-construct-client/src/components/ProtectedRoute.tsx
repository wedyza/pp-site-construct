import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
    onlyGuest?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ onlyGuest }) => {
    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = Boolean(token);
    console.log(token);
    if (onlyGuest && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!onlyGuest && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
