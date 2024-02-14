import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { roomDetail } from "../../api/userapi";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Loader from '../common/Loader';



const DetailsPage=() => {
    const [firstCalendarDate, setFirstCalendarDate] = useState(new Date());
    const { roomId } = useParams()
    const navigate= useNavigate()
   
    const {isLoading, data: Data} = useQuery({
        queryKey: ['roomDetail',roomId as string],
        queryFn: roomDetail 
    });

    const handleChatWithHost = () => {
        navigate('/chats', { state: { userId: Data.userId._id } });
    };

    const date = new Date(Data?.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    // const jdate = new Date(Data?.userId?.createdAt);
    // const joinedDate = jdate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

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
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full">
                        Save
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
                            {/* <p>Joined on {joinedDate}</p> */}
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
                <div className='flex flex-row justify-center gap-2 pt-3'>
                    <div>
                        <Calendar value={firstCalendarDate} />
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