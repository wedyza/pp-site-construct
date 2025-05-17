import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
    onlyGuest?: boolean;
    allowedRoles?: ('Администратор' | 'Продавец' | 'Покупатель')[];
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    onlyGuest,
    allowedRoles,
    redirectTo = '/',
}) => {
    const { token } = useAppSelector((state) => state.auth);
    const { user_type } = useAppSelector((state) => state.user);

    const isAuthenticated = Boolean(token);

    if (onlyGuest && isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!onlyGuest && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user_type || !allowedRoles.includes(user_type))) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
