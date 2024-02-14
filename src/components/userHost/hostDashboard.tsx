import { Link } from 'react-router-dom';
export const Frame = (): JSX.Element => {
    return (
        <>
            <div className="flex flex-col gap-6 text-center  justify-between h-full p-5">
                <div className="bg-gray-300 rounded-lg item-center">
                    <Link to="/Dashboard" className="text-black font-semibold text-sm">Dashboard</Link>
                </div>
                <div className="bg-gray-300 rounded-lg justify-center">
                    <Link to="/chats" className="text-black font-semibold text-sm">Chats</Link>
                </div>
                <div className="bg-gray-300 rounded-lg justify-center">
                    <Link to="/host" className="text-black font-semibold text-sm">Listings</Link>
                </div>
                <div className="bg-gray-300 rounded-lg justify-center">
                    <Link to="" className="text-black font-semibold text-sm">Reservations</Link>
                </div>
            </div>
            <div className='flex flex-col lg:p-5 w-screen'>
               <div >
                    <p className='font-bold'>Recent Activity</p>
               </div>
                    <div className='bg-gray-400 rounded-md'>
                        
                    </div>
            </div>
        </>
    );
};
