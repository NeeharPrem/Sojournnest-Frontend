import Navbar from "../../components/Navbar"
import { Frame } from "../../components/userHost/hostDashboard";

export const HostDash = (): JSX.Element => {
    return (
       <>
            <Navbar />
            <div className="flex flex-row sm:px-10 md:px-10 xs:px-10 px-5 pt-20 h-screen">
                <Frame/>
            </div>
       </>
    );
};