import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import './App.scss';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, user, loading } = useAuth();
    console.log('isAuthenticated::', isAuthenticated, user);

    if (loading) {
        return (
            <div className='loader-container'>
                <div className="loader"></div>
            </div>
        )
    }

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
