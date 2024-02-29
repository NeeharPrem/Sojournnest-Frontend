import { Route, Routes } from "react-router-dom";
import UserProfile from "../pages/user/userProfile";
import HostHome from "../pages/userHost/userHost";
import SelectLocation from "../pages/userHost/SelectLocation";
import { HostDash } from "../pages/userHost/HostDashboard";
import { Messanger } from "../pages/userHost/Messenger/Messanger";
import Wishlist from "../pages/user/wishlist/wishlist";
import Bookings from "../pages/user/bookings/bookings";
import SuccessOrFailure from "../pages/user/success or failure/paymentLast";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/Dashboard" element={<HostDash />}></Route>
      <Route path="/host" element={<HostHome />}></Route>
      <Route path="/location" element={<SelectLocation />}></Route>
      <Route path="/editRoom/:roomId" element={<SelectLocation />}></Route>
      <Route path="/chats" element={<Messanger />}></Route>
      <Route path="/wishlist" element={<Wishlist/>}></Route>
      <Route path="/bookings" element={<Bookings/>}></Route>
      <Route path="/success" element={<SuccessOrFailure />} />
      <Route path="/failure" element={<SuccessOrFailure />} />
    </Routes>
  );
};

export default UserRoutes;
