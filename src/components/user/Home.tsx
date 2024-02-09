import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/userapi";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./HomeSkeleton";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface Room {
  name: string;
  _id: string;
  images: string[];
  state: string;
  district: string;
  rent: string;
}

const HomePage = () => {
  const { data: Data,isLoading} = useQuery({
    queryKey: ["roomData"],
    queryFn: allListings,
  });

  const navigate = useNavigate()

  return (
    <>
        <div id="banner" className="w-full justify-center items-center">
          <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-997566368472977053/original/2b023175-6872-4202-ace0-29bc06504385.jpeg?im_w=960" alt="Card" className="w-full lg:h-72 object-cover" />
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 my-7  items-center">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)
        ) : (
          Data?.data?.map((room: { _id: Key | null | undefined; images: (string | undefined)[]; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; state: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; district: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rent: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <div key={room._id} onClick={() => navigate(`/details/${room._id}`)} className="w-full cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden">
              <img src={room.images[0]} alt="card" className="w-full h-40 object-cover" />
              <div className="flex flex-col p-4">
                <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                <p className="text-gray-700">{room.state}, {room.district}</p>
                <p className="text-gray-700">₹ {room.rent} / night</p>
              </div>
            </div>
          ))
        )}
        </div>

    </>
  );
};
export default HomePage;