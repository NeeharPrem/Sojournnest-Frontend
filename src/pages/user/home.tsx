import Navbar from "../../components/Navbar";
import HomePage from "../../components/user/Home";

const UserHome = () => {
  return (
    <>
      <Navbar/>
      <div className="mt-10">
        <HomePage />
      </div>
    </>
  );
};

export default UserHome;