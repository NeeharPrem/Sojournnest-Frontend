import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { AiTwotoneMessage } from "react-icons/ai";
import { LuTableProperties } from "react-icons/lu";
export const Frame = (): JSX.Element => {
    return (
        <>
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col w-80 lg:p-4 justify-between'>
                    <div className='flex flex-col lg:gap-3 '>
                        <Link to='/' className='hover:cursor-pointer '>
                            <div className='flex flex-row items-center gap-2 max-w-60 hover:shadow-md p-2 rounded-md item-center'>
                                <FaHome />
                                <p> Home</p>
                            </div>
                        </Link>
                        <Link to='/' className='hover:cursor-pointer '>
                            <div className='flex max-w-60 flex-row items-center gap-2 hover:shadow-md p-2 rounded-md item-center'>
                                <TbBrandBooking />
                                <p>Resevations</p>
                            </div>
                        </Link>
                        <Link to='/chats' className='hover:cursor-pointer '>
                            <div className='flex flex-row items-center gap-2 max-w-60 hover:shadow-md p-2 rounded-md item-center'>
                                <AiTwotoneMessage />
                                <p>Messages</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col lg:gap-3 '>
                        <Link to='/host' className='hover:cursor-pointer '>
                            <div className='flex flex-row items-center gap-2 max-w-60 hover:shadow-md p-2 rounded-md item-center'>
                                <LuTableProperties />
                                <p> Listings</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex w-full lg:p-4'>
                    <div className='flex flex-col h-full w-full '>
                        <p className="text-3xl font-semibold tracking-wide">Reservation</p>
                        <p className='text-gray-500'>Manage your reservations here</p>
                        <div className='border-b lg:pt-7'>
                            <p className='font-semibold text-sm lg:pb-4'>summary</p>
                        </div>
                        <div className='border-b lg:pt-7 flex flex-row lg:gap-5'>
                            <div>
                                <p className='font-semibold text-sm lg:pb-4'>Total reservations</p>
                            </div>
                            <div>
                                <p className='font-sans text-sm lg:pb-4'>12</p>
                            </div>
                        </div>
                        <div className='border-b lg:pt-7 flex flex-row lg:gap-5'>
                            <div>
                                <p className='font-semibold text-sm lg:pb-4'>Total Earnigs</p>
                            </div>
                            <div>
                                <p className='font-sans text-sm lg:pb-4'>40000 ₹</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
