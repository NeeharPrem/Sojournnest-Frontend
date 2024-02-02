import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface UserPrivateProps {
    children: React.ReactNode;
}

export const UserPrivate: React.FC<UserPrivateProps> = ({ children }) => {
    const adminId = useSelector((state: RootState) => state.auth.userLoggedin);
    if (!adminId) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};