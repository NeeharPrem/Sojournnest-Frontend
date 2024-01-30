import Navbar from "../../components/Navbar";
import HomePage from "../../components/user/Home";
import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/userapi";

const UserHome = () => {
  const {
    data: Data,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: allListings,
  });
  return (
    <>
      <Navbar />
      <div className="mt-10">
        <HomePage Data={Data} />
      </div>
    </>
  );
};

export default UserHome;
