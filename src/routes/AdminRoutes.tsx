import { Route, Routes } from "react-router-dom";
import AdminDash from "../pages/admin/AdminDash";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { AdminListings } from "../pages/admin/AdminListing";
import { Amenities } from "../pages/admin/Amenities";
import { AdminBookings } from "../pages/admin/AdminBookings";
import { PaymentSettings } from "../pages/admin/PaymentSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDash />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/listings" element={<AdminListings />} />
      <Route path="/facilities" element={<Amenities />} />
      <Route path='/bookings' element={<AdminBookings/>}/>
      <Route path='/payment' element={<PaymentSettings />} />
    </Routes>
  );
};

export default AdminRoutes;
