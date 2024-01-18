import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
    children: ReactNode;
}


export const AdminPrivate: React.FC<PrivateRouteProps> = ({ children }) => {
    const { adminLoggedin } = useSelector((state: any) => state.auth)
    return adminLoggedin ? children : <Navigate to='/admin' replace />;

}