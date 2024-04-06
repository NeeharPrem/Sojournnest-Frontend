import { useMutation } from "@tanstack/react-query";
import { approveListing } from "../../api/adminapi";
import { blockListing } from "../../api/adminapi";
import { SetStateAction, useState } from "react";
import ListingApprove from "../common/modal/ListingApprove";
import ConfirmationModal from "../common/modal/confirmationModal";
import { useQuery } from "@tanstack/react-query";
import { allListings }from "../../api/adminapi"
import { useEffect } from "react";
import { toast } from "sonner";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface listProps {
    _id:string;
   name:string;
   userId:{
    fname:string;
    lname:string;
   };
    is_approved:boolean;
    is_blocked:boolean;
}

const ListingTable= () => {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10; 

    const { data: Data, refetch,isSuccess,isLoading} = useQuery({
        queryKey: ["RoomData",page,limit],
        queryFn: () => allListings(page,limit),
    });

    useEffect(() => {
        if (isSuccess && Data) {
            setTotalPages(Math.ceil(Data?.total / limit));
        }
    }, [isSuccess, Data, limit]);


    const handlePageChange = (_event: any, value: SetStateAction<number>) => {
        setPage(value);
    };

    const { mutate: blockList } = useMutation({
      mutationFn: blockListing,
      onSuccess: (response) => {
        if (response?.status===200) {
          refetch();
        }
      },
    });

    const { mutate: approveList } = useMutation({
        mutationFn: approveListing,
        onSuccess: (response) => {
            if (response?.status===200) {
                toast.success('Room approved')
                refetch();
            }
        },
    });

    const blockConfirmation = () => {
      blockList(selectedUserId);
      setIsConfirmationModalOpen(false);
    };

    const approveConfirmation = () => {
        approveList(selectedUserId);
        setIsApproveModalOpen(false);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const closeApproveModal = () => {
        setIsApproveModalOpen(false);
    };

    const openConfirmationModal = (userId: string) => {
        setSelectedUserId(userId);
        setIsConfirmationModalOpen(true);
    };

    const openApproveModal = (roomId: string) => {
        setSelectedUserId(roomId)
        setIsApproveModalOpen(true);
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
 

    return (
        <div className="justify-center flex-col">
            <>
                <div className="flex justify-center">
                    <table className="min-w-full divide-y divide-gray-200 border-2 rounded-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    No
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hosted Person
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Approve status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data?.data.map((data: listProps, index:number) =>
                                <tr key={index} className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">
                                            {data.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">
                                            {data?.userId?.fname} {data?.userId?.lname}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">
                                            {!data?.is_approved ? (
                                                <button
                                                    onClick={() => openApproveModal(data._id)}
                                                    className="bg-green-900 text-white py-1 px-2 rounded-lg"
                                                >
                                                    Approve
                                                </button>
                                            ) : (
                                                <h3 className="text-green-600">Approved</h3>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="text-sm text-gray-900">
                                            {data.is_blocked ? (
                                                <button
                                                    onClick={() => openConfirmationModal(data._id)}
                                                    className="bg-green-600 text-white py-1 px-2 rounded-lg"
                                                >
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => openConfirmationModal(data._id)}
                                                    className="bg-red-500 text-white py-1 px-2 rounded-lg"
                                                >
                                                    Block
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {isApproveModalOpen && (
                        <ListingApprove
                            message={`Are you sure you want to approve '${Data.data.find((listing:listProps) => listing._id === selectedUserId)?.name}' ?`}
                            onConfirm={approveConfirmation}
                            onCancel={closeApproveModal}
                        />
                    )}
                    <>
                        {isConfirmationModalOpen && (
                            <ConfirmationModal
                                message={`Are you sure you want to ${Data.data.find((listing:listProps) => listing._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this listing?`}
                                onConfirm={blockConfirmation}
                                onCancel={closeConfirmationModal}
                            />
                        )}
                    </>
                </div>
            </>
            <div className="flex justify-center w-full">
                <Stack spacing={2} className='pt-2'>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded" />
                </Stack>
            </div>
        </div>
    );
};

export default ListingTable;