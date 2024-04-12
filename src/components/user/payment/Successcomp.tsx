import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../../api/userapi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/store";
import { clearBookingDetails } from "../../../store/slice/bookingSlice";
import Loader from "../../common/Loader";

interface UserData {
    fcmToken: string;
}

interface UserResponse {
    data: UserData;
}


const Successcomp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const booking = useSelector((state: RootState) => state.booking);
    const [, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (!booking) {
            navigate('/bookings');
            return;
        }

        const fetchData = async () => {
            if (booking.hostId) {
                try {
                    const response: UserResponse = await getUser(booking.hostId);
                    setUserData(response.data);
                    sendNotification(response.data.fcmToken);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            } else {
                console.error('Host ID is undefined or empty');
            }
        };

        fetchData();
        return () => {
            dispatch(clearBookingDetails());
        };
    }, [booking, dispatch, navigate]);

    const sendNotification = async (fcmToken: string) => {
        const YOUR_PROJECT_ID = "notification-b689b";
        const YOUR_ACCESS_TOKEN = "BABkit8FHSso4jub4CLZvhFKMCEK32azzzrbpMqIAqKyj8G0WXwt5gHYaUgWjsUYlVwuy4L1uCiZBJ2F29VdW0w";
        const message = {
            "message": {
                "token": fcmToken,
                "notification": {
                    "title": "New Booking",
                    "body": "New Booking added check your dashboard"
                },
                "webpush": {
                    "fcm_options": {
                        "link": "https://dummypage.com"
                    }
                }
            }
        };

        try {
            const response = await fetch(`https://fcm.googleapis.com/v1/projects/${YOUR_PROJECT_ID}/messages:send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
                },
                body: JSON.stringify(message)
            });
            const data = await response.json();
            console.log('FCM message sent:', data);
        } catch (error) {
            console.error('Error sending FCM message:', error);
        }
    };

    const handleViewBook = () => {
        navigate('/bookings');
    };

    if (!booking) {
        return <Loader />;
    }

    return (
        <div className="flex justify-center lg:pt-10">
            <div className="border-2 border-gray-600 p-5 rounded-md">
                <div id="text" className="text-center">
                    <p className="font-bold text-xl">Payment successful</p>
                </div>
                <div className="flex flex-row justify-center lg:pt-5">
                    <div className="flex flex-row justify-between lg:gap-20 md:gap-14 sm:gap-10 border rounded-md p-5 items-center shadow-md">
                        <div className="flex flex-col">
                            <p>{booking.roomName}</p>
                            <div className="flex flex-row gap-2">
                                <p>Check in: </p><p>{booking.checkInDate}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p>Check out: </p><p>{booking.checkOutDate}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p>Guests: </p><p>{booking.guestsCount}</p>
                            </div>
                        </div>
                        <img src={booking.image} alt="Room Image" className="lg:w-20 lg:h-20 md:w-10 md:h-10 sm:w-12 sm:h-12 object-cover rounded-md" />
                    </div>
                </div>
                <div className="flex justify-center w-full lg:pt-4 lg:pb-2">
                    <p className="font-medium text-xl">Your trip details</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-row justify-between w-full max-w-96">
                        <p className="text-gray-600">Payment</p>
                        <p>{booking.roomRent} ₹</p>
                    </div>
                </div>
                <div className="flex justify-center w-full lg:pt-5 lg:pb-2">
                    <p className="font-medium text-md text-gray-800">Cancellation policy</p>
                </div>
                <div className="flex justify-center w-full">
                    <p className="font-medium text-xs pl-1">
                        Cancellation of booking before 48Hrs is free. After that refund is partial
                    </p>
                </div>
                <div className="flex justify-center w-full lg:pt-5">
                    <button onClick={handleViewBook} className="bg-green-500 w-full rounded h-10">
                        View bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Successcomp;