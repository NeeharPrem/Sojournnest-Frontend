import Sidebar from './Sidebar';
import { useState } from 'react';
import Upcoming from './Upcoming';
import Completed from './Completed';
import Cancelled from './Cancelled';
import Allreservation from './Allreservation';

const Reservations = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const handleSetActiveTab = (tab:string) => {
        setActiveTab(tab);
    }

    const renderTabComponent = () => {
        switch (activeTab) {
            case 'upcoming':
                return <Upcoming />;
            case 'completed':
                return <Completed />;
                case 'completed':
                return <Completed />;
            case 'cancelled':
                return <Cancelled />;
            case 'all':
                return <Allreservation />;
            default:
                return <Upcoming />;
        }
    }

    return (
        <>
            <div className='flex flex-row w-full h-full'>
                <Sidebar />
                <div className='flex flex-col w-full lg:p-4'>
                    <div className='flex flex-col w-full lg:pb-3'>
                        <p className="text-3xl font-semibold tracking-wide">Reservations</p>
                        <p className='text-gray-500'>Manage your reservations here</p>
                        <div className='border-b lg:pt-7 flex flex-row lg:gap-5'>
                            <div className={`border-b-2 ${activeTab === 'upcoming' ? 'border-blue-600' : 'border-transparent'}`}>
                                <button onClick={() => handleSetActiveTab('upcoming')}>
                                    Upcoming
                                </button>
                            </div>
                            <div className={`border-b-2 ${activeTab === 'completed' ? 'border-blue-600' : 'border-transparent'}`}>
                                <button onClick={() => handleSetActiveTab('completed')}>
                                    Completed
                                </button>
                            </div>
                            <div className={`border-b-2 ${activeTab === 'cancelled' ? 'border-blue-600' : 'border-transparent'}`}>
                                <button onClick={() => handleSetActiveTab('cancelled')}>
                                    Cancelled
                                </button>
                            </div>
                            <div className={`border-b-2 ${activeTab === 'all' ? 'border-blue-600' : 'border-transparent'}`}>
                                <button onClick={() => handleSetActiveTab('all')}>
                                    All Bookings
                                </button>
                            </div>
                        </div>
                    </div>
                    {renderTabComponent()}
                </div>
            </div>
        </>
    );
}

export default Reservations;