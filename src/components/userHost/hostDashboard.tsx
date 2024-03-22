import Sidebar from './Reservations/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { hostDashboard } from '../../api/userapi';

export const Frame = (): JSX.Element => {

    const {data: Data} = useQuery({
        queryKey: ['dashData'],
        queryFn: hostDashboard
    });
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = Data?.data.monthlyRevenue.map((item: { month: number; year: number; monthlyRevenue: number; }) => ({
        month: `${monthNames[item.month - 1]} ${item.year}`,
        revenue: item.monthlyRevenue
    }));
    return (
        <>
            <div className='flex flex-row w-full h-full'>
                <Sidebar/>
                <div className='flex w-full lg:p-4'>
                    <div className='flex flex-col h-full w-full '>
                        <p className="text-3xl font-semibold tracking-wide">Dashboard</p>
                        <div className='flex flex-row justify-between gap-6 lg:pt-3'>
                            <div className='bg-[#eff2f4] flex flex-col w-64 rounded-lg p-4 shadow-md'>
                                <p className="text-black text-lg font-medium">Total Earnings</p>
                                <p className="text-black text-xl mt-2">₹ {Data?.data.totalEarnings}</p>
                            </div>
                            <div className='bg-[#eff2f4] flex flex-col w-64 rounded-lg p-4 shadow-md'>
                                <p className="text-black text-lg font-medium">Total Bookings</p>
                                <p className="text-black text-xl mt-2">{Data?.data.totalBookings}</p>
                            </div>
                            <div className='bg-[#eff2f4] flex flex-col w-64 rounded-lg p-4 shadow-md'>
                                <p className="text-black text-lg font-medium">Upcoming Reservation</p>
                                <p className="text-black text-xl mt-2">{Data?.data.totalUpcomingReservations}</p>
                            </div>
                        </div>
                        <div className='flex w-full pt-8'>
                            <div>
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={chartData}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
