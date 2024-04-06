import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../../common/Loader";
import { getBookings, cancelBooking } from "../../../api/userapi";
import { Link } from "react-router-dom";
import { useState,useEffect} from "react";
import Cancelled from "./cancelled";
import { toast } from "sonner";

interface BookingItem {
    _id: string;
    roomId: {
        images: string[];
        name: string;
    };
    checkInDate: string;
    checkOutDate: string;
    guests:number
}

const Booking = () => {
    const [isUpcoming, setIsUpcoming] = useState(true);

    const handleUpcomingClick = () => {
        setIsUpcoming(true);
    };

    const handleCancelledClick = () => {
        setIsUpcoming(false);
    };

    const { data: bookingsData, isLoading, refetch } = useQuery({
        queryKey: ["bookingsData"],
        queryFn: getBookings,
    });

    useEffect(() => {
        refetch();
    }, [isUpcoming, refetch]);

    const { mutate: cancelBookingMutation } = useMutation({
        mutationFn: cancelBooking,
        onSuccess: (response) => {
            if (response) {
                toast.success(response.data.message);
                refetch();
                setIsUpcoming(false)
            }
        },
    });

    const handleCancelBooking = (id: string) => {
        cancelBookingMutation(id);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).replace(/\s/g, '-');
    };

    if (isLoading) {
        return <Loader />;
    }

    const hasBookings = bookingsData?.data?.length > 0;

    return (
        <>
            <div className="px-5">
                <Link to="/profile">Profile</Link> / Bookings
            </div>
            <div className="lg:px-5">
                <p className="font-bold text-custom-size">{isUpcoming ? 'Your Bookings' : 'Cancelled Bookings'}</p>
            </div>
            <div className="px-5">
                <div className="flex flex-row gap-4 border-b">
                    <div className={`border-b pb-2 ${isUpcoming ? 'text-gray-600' : 'text-blue-500'}`}>
                        <button onClick={handleUpcomingClick} className="font-bold">
                            Upcoming
                        </button>
                    </div>
                    <div className={`border-b pb-2 ${!isUpcoming ? 'text-gray-600' : 'text-blue-500'}`}>
                        <button onClick={handleCancelledClick} className="font-bold">
                            Cancelled
                        </button>
                    </div>
                </div>
            </div>
            {isUpcoming ? (
                hasBookings ? (
                    bookingsData?.data.map((room: BookingItem) => (
                        <div key={room._id} className="flex mt-5 px-5">
                            <div className="flex flex-row justify-between items-center p-5 w-full shadow-md rounded-md border border-green-500">
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
                                            <p>{room.guests} Guests</p>
                                        </div>
                                        <div className="flex flex-row text-black mt-1">
                                            {formatDate(room.checkInDate)} - {formatDate(room.checkOutDate)}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleCancelBooking(room._id)} className="border p-1 rounded-md bg-blue-gray-200">
                                        Cancel booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p>No bookings found.</p>
                    </div>
                )
            ) : (
                <Cancelled />
            )}
        </>
    );
};

export default Booking;