import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/userapi";
import Skeleton from "./HomeSkeleton";

interface Room {
  name: string;
  _id: string;
  images: string[];
  state:string
}

const HomePage = () => {
  const { data: Data } = useQuery({
    queryKey: ["roomData"],
    queryFn: allListings,
  });

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto py-8 flex flex-col items-center">
        <div className="flex justify-center flex-wrap gap-3">
          {Data?.data?.map((room: Room) => (
            <div key={room._id} className="w-full sm:w-64 md:w-72 lg:w-96 bg-white rounded-lg overflow-hidden shadow-md border border-gray-300 p-4">
              <img src={room.images[0]} alt="Card" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{room.name || <Skeleton />}</h2>
                <p className="text-gray-700">{room?.state}</p>
                {/* <div className="mt-4">
                  <a href="#" className="text-blue-500 hover:underline">Read More</a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-blue-500 p-4 text-white text-center">
        <p>&copy; 2023 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
