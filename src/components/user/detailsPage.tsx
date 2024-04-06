import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState,useEffect} from "react";
import { roomDetail, addtoWishlist, getWishlist, removeWishlist, checkDateAvailability, payment, roomRating, getRoomRating, bookingAndreview, roomReviewEdit } from "../../api/userapi";
import { useParams, useNavigate} from 'react-router-dom';
import { useQuery,useMutation} from "@tanstack/react-query";
import Loader from '../common/Loader';
import { toast } from 'sonner';
import { FaPenFancy } from "react-icons/fa6";
import Rating from '@mui/material/Rating';
import { AiFillEdit } from "react-icons/ai";
import { Button } from 'flowbite-react';
import {Modal } from 'flowbite-react';
import { saveBookingDetails } from '../../store/slice/bookingSlice';
import { useDispatch } from 'react-redux';

interface DateRange {
    startDate: string;
    endDate: string;
}

interface ReviewsData{
    createdAt:Date | string,
    userId:{
        fname:string;
        lname:string;
        profilePic:string
    };
    rating:number;
    experience:string
}

const DetailsPage=() => {
    const [wishlist,setWishlist]=useState(false)
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isCheckInSelected, setIsCheckInSelected] = useState(true);
    const [minCheckoutDate, setMinCheckoutDate] = useState(new Date());
    const [isAvailable, setIsAvailable] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [kidCount, setKidCount] = useState(0);
    const [showModal,setShowModal]=useState(false)
    const [editModal,setEditModal]=useState(false)
    const [rating, setRating] = useState(0.5);
    const [experience, setExperience] = useState('');
    const [bookingStat,setBookingstat]=useState(true)
    const [reviewStat,setReviewstat]=useState(true)

    const { roomId } = useParams()
    const navigate= useNavigate()
    const dispatch = useDispatch()
   
    const {isLoading, data: Data} = useQuery({
        queryKey: ['roomDetail',roomId as string],
        queryFn: roomDetail 
    });

    const {data: reviewData,refetch} = useQuery({
        queryKey: ['ratingData', roomId as string],
        queryFn: getRoomRating
    });

    const { data: userReviewData, refetch: reviewRefetch } = useQuery({
        queryKey: ['userReviewData', roomId as string],
        queryFn: bookingAndreview
    });

    useEffect(() => {
        if (userReviewData?.data.success === false && userReviewData?.data.reason === "nobooking") {
            setBookingstat(false)
        }
    }, [userReviewData]);

    useEffect(() => {
        if (userReviewData?.data.success === false && userReviewData?.data.reason === "noreview") {
            setReviewstat(false)
        }
    }, [userReviewData]);

    useEffect(()=>{
        if (userReviewData?.data.success === true){
            setExperience(userReviewData.data.data.experience)
            setRating(userReviewData.data.data.rating)
        }
    }, [userReviewData])

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

    const handleDateChange = (value: Date | null, _event: React.MouseEvent<HTMLButtonElement>) => {
        if (value instanceof Date) {
            const formattedValue = formatDate(value);
            if (isCheckInSelected) {
                setCheckInDate(formattedValue);
                setIsCheckInSelected(false);
                const nextDay = new Date(value);
                nextDay.setDate(nextDay.getDate() + 1);
                setMinCheckoutDate(nextDay);
                if (checkOutDate) {
                    setCheckOutDate("");
                    setIsAvailable(false);
                }
            } else {
                setCheckOutDate(formattedValue);
                if (checkInDate && formattedValue) {
                    checkAvailability(checkInDate, formattedValue);
                }
            }
        } else if (value === null) {
            console.log('Date cleared');
            setCheckInDate("");
            setCheckOutDate("");
            setIsAvailable(false);
        }
    };


    const resetDates = () => {
        setCheckInDate(""); 
        setCheckOutDate("");
        setIsCheckInSelected(true); 
        setMinCheckoutDate(new Date());
        setIsAvailable(false)
    };

    const checkAvailability = async (checkIn: string, checkOut: string) => {
        const Data = {
            roomId,
            checkInDate: checkIn,
            checkOutDate: checkOut
        };
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
            toast.warning("Max guests limit reached");
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
            toast.warning("Max guests limit reached");
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
        const saveBook={
            roomName: Data?.name,
            checkInDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
            guestsCount:bookingData.guests,
            roomRent:bookingData.totalAmount,
            image:Data.images[0]
        }
        dispatch(saveBookingDetails(saveBook));
        paymentSession(bookingData)
    }

    const { mutate: roomreview } = useMutation({
        mutationFn: roomRating,
        onSuccess: (response) => {
           if(response?.status===200){
            toast.success(response?.data.message)
               setReviewstat(true)
           }
            refetch()
            reviewRefetch();
        }
    })

    const reviewSubmit =()=>{
        const submissionData = {
            roomId: Data._id, 
            data: {
                rating: rating,
                experience: experience
            }
        }
        roomreview(submissionData)
        setShowModal(false)
        refetch()
        reviewRefetch()
    }

    const { mutate: ReviewEdit } = useMutation({
        mutationFn: roomReviewEdit,
        onSuccess: (response) => {
            if (response.data.modifiedCount ===1) {
                toast.success(response?.message)
                setReviewstat(true)
            }
            refetch()
            reviewRefetch();
        }
    })

    const reviewEditSubmit=()=>{
        const submissionData={
            roomId:Data._id,
            data:{
                rating:rating,
                experience:experience
            }
        }
        ReviewEdit(submissionData)
        setEditModal(false)
        refetch()
        reviewRefetch()
    }

    const formatDateToLocaleString = (dateInput: Date | string | null) => {
        if (!dateInput) return 'Not selected';
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error('formatDateToLocaleString was called with an invalid date:', dateInput);
            return 'Invalid date';
        }

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    };

    const handleExperienceChange = (e:any) => {
        setExperience(e.target.value);
    };

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
                <div className='flex flex-col gap-2 items-center'>
                        <button onClick={() => navigate(`/review/${Data.userId?._id}`)} className='border-2 border-black p-1 rounded-lg'>
                        Write a review
                     </button>
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
                            onChange={(value: any, event: React.MouseEvent<HTMLButtonElement>) => handleDateChange(value as Date | null, event)}
                            value={isCheckInSelected ? (checkInDate ? new Date(checkInDate) : new Date()) : (checkOutDate ? new Date(checkOutDate) : new Date())}
                            minDate={isCheckInSelected ? new Date() : minCheckoutDate}
                            tileClassName={({ date, view }) => {
                                if (view === 'month' && new Date().toDateString() === date.toDateString()) {
                                    return 'calendar-tile-current-date';
                                }
                            }}
                            tileDisabled={({ date, view }) => {
                                if (view !== 'month') return false;
                                const currentYear = new Date().getFullYear();
                                if (date.getFullYear() > currentYear) {
                                    return true;
                                }
                                return Data?.blockedDates?.some(({ startDate, endDate }: DateRange) => {
                                    const start = new Date(startDate);
                                    const end = new Date(endDate);
                                    start.setHours(0, 0, 0, 0);
                                    end.setHours(23, 59, 59, 999);
                                    return date >= start && date <= end;
                                });
                            }}
                        />
                    </div>
                    <div>
                        <p>check in Date: {checkInDate}</p>
                        <p>checout Date: {checkOutDate}</p>
                        {checkInDate && checkOutDate && 
                            <button onClick={resetDates} className="mt-2 bg-red-500 text-white font-bold py-1 px-4 rounded">
                                Reset Dates
                            </button>
                        }
                        {isAvailable && (
                            <>
                                <div className='flex flex-row justify-between lg:mt-2'>
                                    <div className='flex flex-col justify-between'>
                                        <span>Adults:</span>
                                        <span>Kids:</span>
                                    </div>
                                    <div className='flex flex-col lg:gap-2'>
                                        <div className='flex flex-row justify-evenly gap-2 items-center'>
                                            <button onClick={decrementAdultCount} className="text-black font-bold border-2 py-1 px-4 rounded">-</button>
                                            <p>{adultCount}</p>
                                            <button
                                                onClick={() => {
                                                    if (adultCount + kidCount < Data?.guests) {
                                                        incrementAdultCount();
                                                    }
                                                }}
                                                disabled={adultCount + kidCount >= Data?.guests}
                                                className="text-black font-bold border-2 py-1 px-4 rounded">+</button>
                                        </div>
                                        <div className='flex flex-row justify-evenly gap-2'>
                                            <button onClick={decrementKidCount} className="text-black font-bold border-2 py-1 px-4 rounded">-</button>
                                            <p>{kidCount}</p>
                                            <button
                                                onClick={() => {
                                                    if (adultCount + kidCount < Data?.guests) {
                                                        incrementKidCount();
                                                    }
                                                }}
                                                disabled={adultCount + kidCount >= Data?.guests}
                                                className="text-black font-bold border-2 py-1 px-4 rounded">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button onClick={handleCheckout} className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                                        Proceed
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center w-full p-4'>
                <div className='flex flex-row justify-between border-b pb-3 w-full'>
                    <label className="[font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1c140c] text-[22px] tracking-[-0.33px] leading-[27.5px] whitespace-nowrap">Reviews</label>
                    {bookingStat && !reviewStat && <FaPenFancy onClick={() => setShowModal(true)} />}
                    {bookingStat && reviewStat && <AiFillEdit onClick={() => setEditModal(true)} />}
                </div>
                <div className='flex flex-col w-full p-3'>
                    {reviewData && reviewData.length > 0 ? (
                        reviewData.map((item: ReviewsData, index: number) => (
                            <div key={index} className="flex gap-2 lg:p-3 border rounded-md w-full shadow-md">
                                <img src={item?.userId?.profilePic ? item.userId.profilePic : "https://res.cloudinary.com/db5rtuzcw/image/upload/v1705087621/profile-pics/ldyrmmxsfsq2p2zoaefx.png"} alt="card" className="w-10 h-10 rounded-full" />
                                <div className='flex flex-col'>
                                    <p className="text-sm font-bold">{item?.userId?.fname} {item?.userId?.lname}</p>
                                    <p className='text-xs'>{formatDateToLocaleString(item.createdAt)}</p>
                                    <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                                    <p>{item.experience}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </div>
                <Modal show={editModal} onClose={() => setEditModal(false)}>
                    <Modal.Body>
                        <div className=" bg-white p-4">
                            <div className='pb-2'>
                                <label className="font-semibold text-gray-700">Edit Your Rating</label>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-600">Rating:</label>
                                        <Rating name="half-rating" defaultValue={rating} precision={0.5} onChange={(_event, newValue) => {
                                            setRating(newValue || 0.5);
                                        }} className="text-primary" />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="font-medium text-gray-600">Share your experience</label>
                                    <textarea
                                        name="experience"
                                    value={experience}
                                        onChange={handleExperienceChange}
                                        placeholder='Share details of your own experience of this place'
                                        className="block w-full rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={reviewEditSubmit}>Post</Button>
                        <Button color="gray" onClick={() => setEditModal(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Body>
                            <div className=" bg-white p-4">
                                <div className='pb-2'>
                                    <label className="font-semibold text-gray-700">How was your stay</label>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-2'>
                                        <div className="flex items-center gap-2">
                                            <label className="font-medium text-gray-600">Rating:</label>
                                            <Rating name="half-rating" defaultValue={0.5} precision={0.5} onChange={(_event, newValue) => {
                                                setRating(newValue || 0.5);
                                            }} className="text-primary" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className="font-medium text-gray-600">Share your experience</label>
                                        <textarea
                                            name="experience"
                                            onChange={(e) => setExperience(e.target.value)}
                                            placeholder='Share details of your own experience of this place'
                                            className="block w-full rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={reviewSubmit}>Post</Button>
                            <Button color="gray" onClick={() => setShowModal(false)}>
                                Decline
                            </Button>
                        </Modal.Footer>
                    </Modal>
         </>
    ):(
       <Loader/>
    )
};

export default DetailsPage