import Sidebar from './Reservations/Sidebar';
export const Frame = (): JSX.Element => {
    return (
        <>
            <div className='flex flex-row w-full h-full'>
                <Sidebar/>
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
