import { useQuery } from "@tanstack/react-query"
import { compBookings } from "../../../api/userapi"

interface Reservation {
    _id: string;
    checkInDate: string;
    checkOutDate: string;
    updatedAt: string;
    roomName: string;
    userId: {
        fname: string,
        lname: string
    },
    roomId: {
        name: string
    },
    totalAmount: string;
    refundamount: string;
    cancelReq: boolean;
    cancelledRole: string
}

const Completed = () => {

    const { isLoading, data: Data } = useQuery({
        queryKey: ['completedData'],
        queryFn: compBookings
    });
    console.log(Data,"dd")

    const formatDateToLocaleString = (date: Date | null) => {
        if (!date) return 'Not selected';

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    };
    if (isLoading) {
        return (
            <div className='bg-red-200 overflow-auto'>
                <table className="min-w-full divide-y divide-gray-200 border-2 rounded-md">
                    <thead className="bg-gray-50">
                        <tr>
                            {["Guest Name", "Check-in", "Check-out", "Room", "Payment amount", "Action", "Details"].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="animate-pulse bg-gray-300 h-4 w-3/4 mx-auto"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <tr key={index}>
                                {Array.from({ length: 7 }).map((_, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="animate-pulse bg-gray-300 h-6 w-5/6 mx-auto"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (!isLoading && (!Data || !Data.data.data || Data.data.data.length === 0)) {
        return <div className="text-center py-10">No bookings available.</div>;
    }

    return (
        <div className='bg-red-200 overflow-auto'>
            <table className="min-w-full divide-y divide-gray-200 border-2 rounded-md">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Guest Name
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-in
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-out
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Room
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment amount
                        </th>
                        {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                        </th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Data?.data?.data.map((item: Reservation) =>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">
                                    {item.userId.fname} {item.userId.lname}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">
                                    {formatDateToLocaleString(new Date(item.checkInDate))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">
                                    {formatDateToLocaleString(new Date(item.checkOutDate))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">{item.roomId.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">₹ {item.totalAmount}</div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">{formatDateToLocaleString(new Date(item.updatedAt))}</div>
                            </td> */}
                            {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900">{item.cancelledRole}</div>
                            </td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Completed