import Navbar from "../../components/Navbar";
import ListingTable from "../../components/userHost/hostTable";
import HostHeader from "../../components/userHost/hostHead";
import { getListings } from "../../api/userapi";
import { useQuery } from "@tanstack/react-query";

const HostHome = () => {
  const {
    data: Data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getListings,
  });
  return (
    <>
      <Navbar />
      <div className="lg:flex flex-col justify-evenly mt-10 pb-20 lg:pt-10 pt-7 px-5 md:px-14 xl:px-28">
        <div className="w-full h-full ">
          <HostHeader />
        </div>
        <div className="w-full h-full mt-10">
          <ListingTable
            isLoading={isLoading}
            refetch={refetch}
            roomInfo={Data?.data || []}
          />
        </div>
      </div>
    </>
  );
};

export default HostHome;
