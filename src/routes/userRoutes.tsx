import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/user/userLogin";
import UserHome from "../pages/user/home";
import UserProfile from "../pages/user/userProfile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/profile" element={<UserProfile />}/>
      <Route path="/login" element={<SignUp/>}></Route>
    </Routes>
  );
};

export default UserRoutes;