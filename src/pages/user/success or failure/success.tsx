import Navbar from "../../../components/Navbar";
import Successcomp from "../../../components/user/payment/success";
const Success = () => {

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                  <Successcomp/>
            </div>
        </>
    );
};

export default Success;
