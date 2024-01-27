import Login from "../../components/admin/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLoggedin } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (adminLoggedin) {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <>
      <div>
        <Login />
      </div>
    </>
  );
};

export default AdminLogin;
