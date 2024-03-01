import Navbar from "../../components/Navbar";
import SignUp from "../../components/user/SignUp";

const UserSignup = () => {
    return (
        <div className="h-screen">
            <div className="flex flex-col lg:px-11 sm:px-10 md:px-10 bg-brown-100">
                <SignUp />
            </div>
        </div>
    );
};

export default UserSignup;
