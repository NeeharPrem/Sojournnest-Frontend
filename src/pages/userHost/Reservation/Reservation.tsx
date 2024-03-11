import NavBar from "../../../components/Navbar";
import Reservations from "../../../components/userHost/Reservations/Reservations";

export const Reservation = (): JSX.Element => {
    return (
        <>
            <NavBar/>
            <div className="flex flex-row sm:px-10 md:px-10 xs:px-10 px-5 pt-20 h-screen">
            <Reservations/>
            </div>
        </>
    );
};