import Loader from "../../common/Loader";
import { useQuery } from "@tanstack/react-query";
import { cancelledBookings } from "../../../api/userapi";

interface BookingRoom {
    images: string[];
    name: string;
    bedrooms: number;
    guests: number;
    bathrooms: number;
}

interface BookingItem {
    _id: string;
    roomId: BookingRoom;
    checkInDate: string;
    checkOutDate: string;
}

const Cancelled = () => {

    const { data: bookingsData, isLoading, refetch } = useQuery({
        queryKey: ["cancelledData"],
        queryFn: cancelledBookings,
    });

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).replace(/\s/g, '-');
    }

    if (isLoading) return <Loader/>;

  return (
      <div className="flexbg-blue-gray-500 mt-5 px-5">
          {bookingsData?.data?.map((room: BookingItem) => (
              <div key={room._id} className="flex mt-5 px-5">
                  <div className="flex flex-row justify-between items-center p-5 w-full shadow-md rounded-md border">
                      <div className="flex flex-row gap-4">
                          <div>
                              <img
                                  src={room.roomId.images[0]}
                                  alt="Room"
                                  className="lg:w-20 lg:h-20 object-cover rounded-md"
                              />
                          </div>
                          <div className="lg:pt-1">
                              <div>
                                  <p className="font-bold">{room.roomId.name}</p>
                              </div>
                              <div className="flex flex-row gap-1">
                                  <p>{room.roomId.bedrooms} Beds · {room.roomId.guests} Guests · {room.roomId.bathrooms} Bathrooms</p>
                              </div>
                              <div className="flex flex-row text-black mt-1">
                                  {formatDate(room.checkInDate)} - {formatDate(room.checkOutDate)}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default Cancelled