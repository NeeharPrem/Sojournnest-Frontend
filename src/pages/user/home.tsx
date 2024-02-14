import Navbar from "../../components/Navbar";
import HomePage from "../../components/user/Home";

const UserHome = () => {

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
        <div>
          <HomePage />
        </div>
      </div>
    </>
  );
};

export default UserHome;
