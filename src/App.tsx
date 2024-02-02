import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import UserLogin from "./pages/user/userLogin";
import UserHome from "./pages/user/home";
import SignUp from "./components/user/SignUp";
import { AdminPrivate } from "./components/common/PrivateRoute";
import { UserPrivate } from "./components/common/userPrivateRoute";
import UserRoutes from "./routes/userRoutes";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public User Routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminPrivate>
              <AdminRoutes />
            </AdminPrivate>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/*"
          element={
            <UserPrivate>
              <UserRoutes />
            </UserPrivate>
          }
        />
      </Routes>
    </>
  );
}
