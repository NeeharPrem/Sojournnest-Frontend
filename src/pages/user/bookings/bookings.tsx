import NavBar from "../../../components/Navbar";
import Booking from "../../../components/user/bookings/bookings";
const Bookings = () => {

    return (
        <>
            <NavBar />
            <div className="flex flex-col lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                <div className="lg:mt-4">
                   <Booking/>
                </div>
            </div>
        </>
    );
};

export default Bookings;