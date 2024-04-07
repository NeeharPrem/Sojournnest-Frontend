import { Route, Routes } from "react-router-dom";
import UserProfile from "../pages/user/userProfile";
import HostHome from "../pages/userHost/userHost";
import SelectLocation from "../pages/userHost/SelectLocation";
import { HostDash } from "../pages/userHost/HostDashboard";
import { Messanger } from "../pages/userHost/Messenger/Messanger";
import Wishlist from "../pages/user/wishlist/wishlist";
import Bookings from "../pages/user/bookings/bookings";
import SuccessOrFailure from "../pages/user/success or failure/success";
import ManageDate from "../pages/userHost/Date/ManageDate";
import { Reservation } from "../pages/userHost/Reservation/Reservation";
import ReviewPage from "../pages/userHost/ReviewPage";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/Dashboard" element={<HostDash />}></Route>
      <Route path="/reservations" element={<Reservation />}></Route>
      <Route path="/host" element={<HostHome />}></Route>
      <Route path="/location" element={<SelectLocation />}></Route>
      <Route path="/editRoom/:roomId" element={<SelectLocation />}></Route>
      <Route path="/chats" element={<Messanger />}></Route>
      <Route path="/wishlist" element={<Wishlist/>}></Route>
      <Route path="/bookings" element={<Bookings/>}></Route>
      <Route path='/managedate/:roomId' element={<ManageDate/>}></Route>
      <Route path="/success/:Id" element={<SuccessOrFailure />} />
      <Route path="/failure" element={<SuccessOrFailure />} />
      <Route path="/review/:hostId" element={<ReviewPage />} />
    </Routes>
  );
};

export default UserRoutes;