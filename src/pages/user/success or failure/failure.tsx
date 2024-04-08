import Navbar from "../../../components/Navbar";
import Failcomp from "../../../components/user/payment/Failcomp";
const Failure = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                <Failcomp/>
            </div>
        </>
    );
};
export default Failure;