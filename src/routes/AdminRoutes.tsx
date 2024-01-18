import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDash from "../pages/admin/AdminDash";
import { AdminUsers } from "../pages/admin/AdminUsers";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDash/>}/>
            <Route path="/users" element={<AdminUsers />} />
        </Routes>
    );
};

export default AdminRoutes;