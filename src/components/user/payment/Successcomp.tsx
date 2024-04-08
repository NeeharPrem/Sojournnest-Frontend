import { useNavigate} from "react-router-dom"
import { useEffect,useState} from "react";
// import { getUser } from "../../../api/userapi";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { clearBookingDetails } from "../../../store/slice/bookingSlice";
import { useDispatch } from 'react-redux';
import Loader from "../../common/Loader";


// interface UserData {
//     fcmToken:string
// }

// interface UserResponse {
//     data:UserData
// }

interface BookingDetails {
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: number;
    image: string;
    roomRent: number;
    hostId:string;
}

const Successcomp = () => {

    const navigate= useNavigate()
    const dispatch = useDispatch();
    // const [, setUserData] = useState<UserData | null>(null);
    const [newData,setData]=useState<BookingDetails| null>(null);
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
                hostId:booking.hostId
            });
        }
        dispatch(clearBookingDetails());
        // const Id = newData?.hostId
        // const fetchData = async () => {
        //     try {
        //         if (Id && Id.trim() !== '') {
        //             const response: UserResponse = await getUser(Id);
        //             setUserData(response.data);
        //             if (response.data) {
        //                 const fcmToken = response.data.fcmToken;
        //                 const YOUR_PROJECT_ID = "notification-b689b";
        //                 const YOUR_ACCESS_TOKEN = "BABkit8FHSso4jub4CLZvhFKMCEK32azzzrbpMqIAqKyj8G0WXwt5gHYaUgWjsUYlVwuy4L1uCiZBJ2F29VdW0w";
        //                 const message = {
        //                     "message": {
        //                         "token": fcmToken,
        //                         "notification": {
        //                             "title": "New Booking",
        //                             "body": "New Booking added check your dashboard"
        //                         },
        //                         "webpush": {
        //                             "fcm_options": {
        //                                 "link": "https://dummypage.com"
        //                             }
        //                         }
        //                     }
        //                 };

        //                 fetch(`https://fcm.googleapis.com/v1/projects/${YOUR_PROJECT_ID}/messages:send`, {
        //                     method: 'POST',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                         'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
        //                     },
        //                     body: JSON.stringify(message)
        //                 })
        //                     .then(response => response.json())
        //                     .then(data => console.log('FCM message sent:', data))
        //                     .catch(error => console.error('Error sending FCM message:', error));
        //             }
        //         } else {
        //             console.error('User ID is undefined or empty');
        //         }
        //     } catch (error) {
        //         console.error('Failed to fetch user data:', error);
        //     }
        // };
        // fetchData();
        
    }, [dispatch,navigate]);
    

    const handleViewbook=()=>{
        navigate('/bookings')
    }

    if (!newData) {
        return <Loader/>;
    }
  return (
        <>
          <div className="flex justify-center lg:pt-10">
              <div className="border-2 border-gray-600 p-5 rounded-md">
                  <div id='text' className="text-center ">
                      <p className="font-bold text-xl">Payment successful</p>
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
                          <p className="font-medium text-xl">Your trip details</p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center">
                      <div className="flex flex-row justify-between w-full max-w-96">
                          <div className="flex flex-col gap-2">
                              <p className="text-gray-600">Payment</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <p>{newData.roomRent} ₹</p>
                          </div>
                      </div>
                  </div>
                  <div className="flex w-full justify-center lg:pt-5 lg:pb-2">
                      <div className="flex justify-start w-full max-w-96">
                          <p className="font-medium text-md text-gray-800">Cancellation policy</p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center">
                      <div className="flex justify-start w-full max-w-96">
                          <p className="font-medium text-xs pl-1">
                              Cancellation of booking before 48Hrs is free.
                              After that refund is partial
                          </p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center lg:pt-5">
                      <div className="flex justify-start w-full max-w-96">
                          <button onClick={handleViewbook} className="bg-green-500 w-full rounded h-10">
                              view bookings
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </>
  )
}

export default Successcomp
