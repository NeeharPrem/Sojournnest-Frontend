import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import { AdminPrivate } from "./components/common/PrivateRoute";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <AdminPrivate>
              <AdminRoutes />
            </AdminPrivate>
          }
        />

        {/* User routes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}