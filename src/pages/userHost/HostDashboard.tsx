import Dashboard from "../../components/userHost/DashBar";
import Navbar from "../../components/Navbar"
import { Frame } from "../../components/userHost/hostDashboard";

export const HostDash = (): JSX.Element => {
    return (
       <>
            <Navbar />
            <div className="flex flex-row lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                {/* <Dashboard/> */}
                <Frame/>
            </div>
       </>
    );
};