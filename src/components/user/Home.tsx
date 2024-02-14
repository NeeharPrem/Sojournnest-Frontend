import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/userapi";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./HomeSkeleton";
import { useState, useEffect } from "react";

interface Room {
  name: string;
  _id: string;
  images: string[];
  state: string;
  district: string;
  rent: string;
  // Assuming you have an isActive property for filtering
  isActive?: boolean;
  category: 'room' | 'home';
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name"); // default sorting by name
  const [sortOrder, setSortOrder] = useState<string>("asc"); // asc or desc
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Room[]>([]);
  const [roomType, setRoomType] = useState<'room' | 'home' | ''>('');

  const { data: Data, isLoading } = useQuery<Room[], Error>({
    queryKey: ["roomData"],
    queryFn: allListings,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (Data) {
      let processedData = [...Data?.data];

      // Assuming you want to toggle between showing all and showing only active
      if (filterActive) {
        processedData = processedData.filter(room => room.isActive);
      }

      if (roomType) {
        processedData = processedData.filter(room => room.category === roomType);
      }

      // Search
      if (searchQuery) {
        processedData = processedData.filter(room =>
          room.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort
      processedData.sort((a, b) => {
        const fieldA = a[sortField].toString().toLowerCase();
        const fieldB = b[sortField].toString().toLowerCase();

        if (sortOrder === "asc") {
          return fieldA.localeCompare(fieldB);
        } else {
          return fieldB.localeCompare(fieldA);
        }
      });

      setFilteredData(processedData);
    }
  }, [Data, searchQuery, sortField, sortOrder, filterActive, roomType]);

  const resetFilters = () => {
    setSearchQuery("");
    setSortOrder("asc");
    setFilterActive(false); 
    setRoomType('');
  };

  return (
    <>
        <div id="banner" className="w-full justify-center items-center pb-3">
          <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-997566368472977053/original/2b023175-6872-4202-ace0-29bc06504385.jpeg?im_w=960" alt="Card" className="w-full lg:h-72 object-cover" />
        </div>
      <div id="bar" className="flex flex-row justify-between border-b-2 border-t-2 p-3">
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </div>
          <div className="flex gap-2">
          <div>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              Sort Order: {sortOrder.toUpperCase()}
            </button>
          </div>
        <div>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as 'room' | 'home' | '')}
            >
              <option value="">Category</option>
              <option value="room">Room</option>
              <option value="home">Home</option>
            </select>
        </div>
        <div>
            <button onClick={resetFilters} className="px-2 py-1 text-sm text-white bg-black hover:bg-white hover:text-black rounded">
              Reset Filters
            </button>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 my-7  items-center">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)
        ) : (
            filteredData.map(room => (
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