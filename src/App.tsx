import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { AdminPrivate } from "./components/common/PrivateRoute";
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route
          path="/dashboard"
          element={<AdminPrivate><AdminRoutes /></AdminPrivate>}
        /><Route
          path="/users"
          element={<AdminPrivate><AdminRoutes /></AdminPrivate>}
        />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}
