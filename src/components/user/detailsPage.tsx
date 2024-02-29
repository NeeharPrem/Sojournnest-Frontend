import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState,useEffect} from "react";
import { roomDetail, addtoWishlist, getWishlist, removeWishlist, checkDateAvailability,payment} from "../../api/userapi";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery,useMutation} from "@tanstack/react-query";
import Loader from '../common/Loader';
import { toast } from 'react-toastify';


const DetailsPage=() => {
    const [wishlist,setWishlist]=useState(false)
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isCheckInSelected, setIsCheckInSelected] = useState(true);
    const [minCheckoutDate, setMinCheckoutDate] = useState(new Date());
    const [isAvailable, setIsAvailable] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [kidCount, setKidCount] = useState(0);

    const { roomId } = useParams()
    const navigate= useNavigate()
   
    const {isLoading, data: Data} = useQuery({
        queryKey: ['roomDetail',roomId as string],
        queryFn: roomDetail 
    });

    const { mutate: paymentSession } = useMutation({
        mutationFn: payment,
        onSuccess: (response:any) => {
            window.location.href = response.data.url;
        }
    })

    const handleChatWithHost = () => {
        navigate('/chats', { state: { userId: Data.userId._id } });
    };

    const {mutate: Wishlist}= useMutation({
        mutationFn: addtoWishlist,
        onSuccess:(response)=>{
            if (response?.status === 200) {
                toast.success(response.data)
                setWishlist(true)
            }
        }
    })

    const { mutate: removWishlist } = useMutation({
        mutationFn: removeWishlist,
        onSuccess: (response) => {
            if (response?.status === 200) {
                setWishlist(false)
                toast.success(response.data.message)
            }
        }
    })

    const { data:wishlistData } = useQuery({
        queryKey: ['wishlist', roomId],
        queryFn: () => getWishlist(roomId),
    });

    useEffect(() => {
        if (wishlistData?.data) {
            setWishlist(wishlistData.data);
        }
    }, [wishlistData]);

    const handleWishlist =()=>{
        Wishlist(Data?._id)
    }

    const remove=()=>{
        removWishlist(Data?._id)
    }

    const conditionalHandleWishlist = () => {
        if (!wishlist) {
            handleWishlist();
        }else{
            remove()
        }
    };

    const date = new Date(Data?.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    const formatDate = (date: Date) => {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const handleDateChange = (value: Date) => {
        const formattedValue = formatDate(value);
        if (isCheckInSelected) {
            setCheckInDate(formattedValue);
            setIsCheckInSelected(false);
            const nextDay = new Date(value);
            nextDay.setDate(nextDay.getDate() + 1);
            setMinCheckoutDate(nextDay);
        } else {
            setCheckOutDate(formattedValue);
            setIsCheckInSelected(true);
        }
    };

    const resetDates = () => {
        setCheckInDate(""); 
        setCheckOutDate("");
        setIsCheckInSelected(true); 
        setMinCheckoutDate(new Date());
        setIsAvailable(false)
    };

    const checkAvailability = async () => {
    
        const Data={
            roomId,
            checkInDate,
            checkOutDate
        }
        const availability= await checkDateAvailability(Data);
        if(availability?.status==200){
            toast.success(availability.data.message)
            setIsAvailable(true);
        }else{
            setIsAvailable(false);
        }
    };

    const incrementAdultCount = () => {
        if (adultCount + kidCount < Data?.guests) {
            setAdultCount(prevCount => prevCount + 1);
        } else {
            toast.warn("Max guests limit reached");
        }
    };

    const decrementAdultCount = () => {
        if (adultCount > 1) {
            setAdultCount(prevCount => prevCount - 1);
        }
    };

    const incrementKidCount = () => {
        if (adultCount + kidCount < Data?.guests) {
            setKidCount(prevCount => prevCount + 1);
        } else {
            toast.warn("Max guests limit reached");
        }
    };

    const decrementKidCount = () => {
        if (kidCount > 0) {
            setKidCount(prevCount => prevCount - 1);
        }
    };

    const handleCheckout=()=>{
        const bookingData={
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            guests:adultCount+kidCount,
            roomId:Data._id,
            hostId:Data.userId._id,
            totalAmount:Data.rent
        }
        paymentSession(bookingData)
    }


    return !isLoading ?(
         <>
            <div className="flex flex-row justify-between w-full mb-5 h-20 p-2 border-b-2">
                <div className="flex flex-col">
                    <h2 className="font-bold [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] text-[#1c140c] text-[22px] tracking-[-0.33px] leading-[27.5px] whitespace-nowrap">{Data?.name}</h2>
                    <div className="flex flex-row gap-2 font-medium">
                        <h2>{Data?.district}</h2>.<h2>{Data?.state}</h2>
                    </div>
                </div>
                <div className="flex justify-center items-center p-2">
                    <button onClick={conditionalHandleWishlist} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full">
                        {wishlist ? ('Remove wishlist') : ('wishlist')}
                    </button>
                </div>
            </div>
            <div id="banner" className="w-full justify-center items-center">
                <img src={Data.images[0]} alt="Card" className="w-full h-56 object-cover" />
            </div>
            <div className='flex flex-row gap-2 w-full justify-between pt-3 mt-3 border-t-2'>
                {Data?.images?.slice(1).map((map: string) => (
                    <img src={map} alt="Card" className="min-w-0 flex-auto h-32 object-cover shadow-lg" />
                ))}
            </div>
            <div className="flex justify-start w-full pt-3 pb-3">
                <div className="flex flex-row font-bold">
                    <h1>{Data?.bedrooms} rooms</h1>.<h1>{Data?.guests} guests</h1>.<h1>{Data?.bathrooms} bathrooms</h1>
                </div>
            </div>
            <div className="flex flex-col justify-start w-full pt-3 pb-3">
                <label className="[font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1c140c] text-[22px] tracking-[-0.33px] leading-[27.5px] whitespace-nowrap">Amenities</label>
                <div className="flex flex-row gap-2 pt-2">
                    {Data?.amenities.map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined,index: any)=>(
                        <div key={index} className="flex  items-center justify-center gap-[8px] px-[16px] py-0 bg-[#f4ede8] rounded-[12px]">
                            <div className="flex flex-col h-[21px] items-start">
                                <div className="flex flex-col items-start self-stretch w-full flex-[0_0_auto]">
                                    <div className="rw-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#1c140c] text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
                                        {item}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" pb-3">
                <h1 className='font-bold text-xl'>Description</h1>
                    <p>
                        {Data?.description}
                    </p>
            </div>
            <div className="pb-3 flex flex-row justify-between">
                <div>
                    <h1 className='font-bold text-xl'>Host</h1>
                    <div className="flex items-center space-x-4">
                        <img src={Data?.userId?.profilePic ? Data.userId.profilePic : "https://res.cloudinary.com/db5rtuzcw/image/upload/v1705087621/profile-pics/ldyrmmxsfsq2p2zoaefx.png"} alt="card" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{Data?.userId?.fname} {Data?.userId?.lname}</p>
                        </div>
                    </div>
                    {Data?.name} is hosted on {formattedDate}
                </div>
                <div>
                    <button onClick={handleChatWithHost} className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-full">
                        Chat with Host
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-start w-full pb-3">
                <label className="[font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1c140c] text-[22px] tracking-[-0.33px] leading-[27.5px] whitespace-nowrap">When you'll be there</label>
                <div className='flex flex-row justify-center gap-4 pt-3'>
                    <div>
                        <Calendar
                            onChange={handleDateChange}
                            value={isCheckInSelected ? (checkInDate ? new Date(checkInDate) : new Date()) : (checkOutDate ? new Date(checkOutDate) : new Date())}
                            minDate={isCheckInSelected ? new Date() : minCheckoutDate}
                            tileClassName={({ date, view }) => {
                                if (view === 'month' && new Date().toDateString() === date.toDateString()) {
                                    return 'calendar-tile-current-date';
                                }
                            }}
                        />
                    </div>
                    <div>
                        <p>check in Date: {checkInDate}</p>
                        <p>checout Date: {checkOutDate}</p>
                        <button onClick={resetDates} className="mt-2 bg-red-500 text-white font-bold py-1 px-4 rounded-full">
                            Reset Dates
                        </button>
                        {checkInDate && checkOutDate && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={checkAvailability}
                                    className="bg-black text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Check Availability
                                </button>
                            </div>
                        )}
                        {isAvailable && (
                            <>
                                <div className="flex justify-between items-center mt-4">
                                    <span>Adults:</span>
                                    <button onClick={decrementAdultCount} className="bg-red-500 text-white font-bold py-1 px-4 rounded-full">-</button>
                                    <span>{adultCount}</span>
                                    {adultCount < Data?.guests && (
                                        <button onClick={incrementAdultCount} className="bg-green-500 text-white font-bold py-1 px-4 rounded-full">+</button>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span>Kids:</span>
                                    <button onClick={decrementKidCount} className="bg-red-500 text-white font-bold py-1 px-4 rounded-full">-</button>
                                    <span>{kidCount}</span>
                                    <button onClick={incrementKidCount} className="bg-green-500 text-white font-bold py-1 px-4 rounded-full">+</button>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={handleCheckout}
                                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <label className="[font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1c140c] text-[22px] tracking-[-0.33px] leading-[27.5px] whitespace-nowrap">Reviews</label>
            </div>
         </>
    ):(
       <Loader/>
    )
};

export default DetailsPage