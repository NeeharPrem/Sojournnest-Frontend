import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { RootState } from '../../store/store';

interface AdminPrivateProps {
  children: React.ReactNode;
}

export const AdminPrivate: React.FC<AdminPrivateProps> = ({ children }) => {
  const adminId = useSelector((state: RootState) => state.auth.adminLoggedin);
  if (!adminId) {
    return <Navigate to="/admin/login"/>;
  }

  return <>{children}</>;
};