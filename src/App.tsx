import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import UserLogin from "./pages/user/userLogin";
import UserHome from "./pages/user/home";
import UserSignup from "./pages/user/userSignup";
import { ListingDetails } from "./pages/user/listingDetails";
import { AdminPrivate } from "./components/common/PrivateRoute";
import { UserPrivate } from "./components/common/userPrivateRoute";
import UserRoutes from "./routes/userRoutes";
import { useEffect } from "react";
import { generateToken, messaging } from "./firebase";
import { onMessage } from "firebase/messaging";
import { saveFcmtoken } from "./api/userapi";
import { useSelector} from "react-redux";

interface RootState {
  auth: {
    userLoggedin: boolean;
  };
}

export default function App() {
  const { userLoggedin } = useSelector((state: RootState) => state.auth);
  useEffect(()=>{
    generateToken().then((token) => {
      if (token) {
        if (userLoggedin) {
          saveFcmtoken(token).then(() => {
            console.log("Token sent to backend successfully");
          }).catch((error) => {
            console.error("Error sending token to backend:", error);
          });
        } else {
          localStorage.setItem('fcmToken', token);
          console.log("Token saved locally");
        }
      }
    });
    onMessage(messaging,(payload)=>{
      console.log(payload)
    })
  },[])
  return (
    <>
      <Routes>
        {/* Public User Routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path='/details/:roomId' element={<ListingDetails/>}/>

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
