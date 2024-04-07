import Login from "../../components/user/Login";

const UserLogin = () => {
  return (
    <div className="overflow-y-hidden h-screen ">
      <div className="flex flex-col lg:px-11 sm:px-10 md:px-10 pt-10 bg-brown-100">
        <Login />
      </div>
   </div>
  );
};

export default UserLogin;
