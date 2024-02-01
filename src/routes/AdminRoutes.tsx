import { Route, Routes } from "react-router-dom";
import AdminDash from "../pages/admin/AdminDash";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { AdminListings } from "../pages/admin/AdminListing";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDash />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/listings" element={<AdminListings />} />
    </Routes>
  );
};

export default AdminRoutes;
