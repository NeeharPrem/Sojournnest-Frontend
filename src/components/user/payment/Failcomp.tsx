import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { clearBookingDetails } from "../../../store/slice/bookingSlice";
import { useDispatch } from 'react-redux';
import Loader from "../../common/Loader";

interface BookingDetails {
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: number;
    image: string;
    roomRent: number;
    hostId: string;
}

const Failcomp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [newData, setData] = useState<BookingDetails | null>(null);
    const booking = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        if (booking) {
            setData({
                roomName: booking.roomName,
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                guestsCount: booking.guestsCount,
                image: booking.image,
                roomRent: booking.roomRent,
                hostId: booking.hostId
            });
        }
        dispatch(clearBookingDetails()); 
    }, [dispatch, navigate]);


    const handleViewbook = () => {
        navigate('/')
    }

    if (!newData) {
        return <Loader />;
    }
    return (
        <>
            <div className="flex justify-center lg:pt-10">
                <div className="border-2 border-gray-600 p-5 rounded-md">
                    <div id='text' className="text-center ">
                        <p className="font-bold text-red-600 text-xl">Payment Failed</p>
                    </div>
                    <div className="flex flex-row w-full justify-center lg:pt-5">
                        <div className="flex flex-row justify-between lg:gap-20 md:gap-14 sm:gap-10 border rounded-md p-5 items-center shadow-md ">
                            <div className="lg:gap-3">
                                <div className="flex flex-col">
                                    <p>{newData.roomName}</p>
                                    <div className="flex flex-row gap-2">
                                        <p>Check in : </p><p>{newData.checkInDate}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p>Check out : </p><p>{newData.checkOutDate}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p>Guests : </p><p>{newData.guestsCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img
                                        src={newData.image}
                                        alt="Profile Pic"
                                        className="lg:w-20 lg:h-20 md:w-10 md:h-10 sm:w-12 sm:h-12  object-cover rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center lg:pt-4 lg:pb-2">
                        <div className="flex justify-start w-full max-w-96">
                        </div>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="flex flex-row justify-between w-full max-w-96">
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-600">Failed amount</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>{newData.roomRent} ₹</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center lg:pt-5">
                        <div className="flex justify-start w-full max-w-96">
                            <button onClick={handleViewbook} className="bg-red-500 w-full rounded h-10">
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Failcomp