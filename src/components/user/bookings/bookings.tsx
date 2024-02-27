import { useQuery, useMutation } from "@tanstack/react-query"
import Loader from "../../common/Loader";
import { toast } from "react-toastify";
import { Link,useLocation} from "react-router-dom";
import { useState } from "react";
import Cancelled from "./cancelled";

const Booking = () => {
    const [isUpcoming, setIsUpcoming] = useState(true); 

    const handleUpcomingClick = () => {
        setIsUpcoming(true);
    };

    const handleCancelledClick = () => {
        setIsUpcoming(false);
    };
    // const {
    //     data: Data, isLoading
    // } = useQuery({
    //     queryKey: ["wishListData",],
    //     queryFn: userWishlists,
    // });

    // const { mutate: removWishlist } = useMutation({
    //     mutationFn: removeWishlist,
    //     onSuccess: (response) => {
    //         if (response?.status === 200) {
    //             toast.success(response.data.message)
    //         }
    //     }
    // })

    // const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     const button = event.target as HTMLButtonElement;
    //     const Id = button.getAttribute('data-id') || '';
    //     console.log('am hee', Id);
    //     removWishlist(Id);
    // };
    
    return (
        <>
            <div className="px-5">
                <Link to="/profile">Profile</Link> / Bookings
            </div>
            <div className="lg:px-5">
                {isUpcoming ? (<p className="font-bold text-custom-size">Your Bookings</p>):
                    (<p className="font-bold text-custom-size">Cancelled Bookings</p>)
                }
            </div>
            <div className="px-5">
              <div className="flex flex-row gap-4 border-b">
                    <div className="border-b pb-2">
                        <button onClick={handleUpcomingClick} className={`font-bold ${isUpcoming ? ('text-gray-600') : ('text-blue-500')}`}>
                            Upcoming
                        </button>
                    </div>
                    <div className="border-b pb-2">
                        <button onClick={handleCancelledClick} className={`font-bold ${!isUpcoming ? 'text-gray-600' : 'text-blue-500'}`}>
                            Cancelled
                        </button>
                    </div>
              </div>
            </div>
            {isUpcoming ?(
                <div className="flexbg-blue-gray-500 mt-5 px-5">
                    <div className="flex flex-row justify-between items-center p-5 w-full shadow-md rounded-md border">
                        <div className="flex flex-row gap-2">
                            <div>
                                <img
                                    src="https://a0.muscache.com/im/pictures/miso/Hosting-821668347227918484/original/71e0d8e0-3dee-414f-850f-018c42a8f460.jpeg?im_w=960"
                                    alt="Profile Pic"
                                    className="lg:w-20 lg:h-20  object-cover rounded-md"
                                />
                            </div>
                            <div className="lg:pt-3">
                                <div className="flex flex-row gap-1">
                                    <p>Room name</p>
                                    {/* <p>{room.bedrooms} Bedrooms</p> */}
                                </div>
                                <div className="flex flex-row gap-1">
                                    {/* <p>{room.guests} Guests .</p>
                                    <p>{room.bathrooms} Bathrooms .</p> */}
                                </div>
                            </div>
                        </div>
                        <div >
                            <button className="border p-1 rounded-md bg-blue-gray-200">
                                Cancel booking
                            </button>
                        </div>
                    </div>
                </div>
            ):(
                    <Cancelled/>
            )}
        </>
    )
}

export default Booking