import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/userapi';
import { userLogout } from '../store/slice/authSlice';
import { toast } from 'react-toastify';

interface RootState {
  auth: {
    userLoggedin: boolean;
  };
}

const Navbar = () => {
  const { userLoggedin } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLogout());
      toast.success('Logout Success');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white p-4 border-b fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <Link to="/" className="text-black hover:text-gray-300">
            SojournNest
          </Link>
        </div>
        <div className="space-x-4">
          {userLoggedin && location.pathname !== '/profile' ? (
            <>
              <Link to="/profile" className="text-black hover:text-gray-300">
                Profile
              </Link>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
              userLoggedin ? (  
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-black hover:text-gray-300">
                  Login
                </Link>
              )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;