import { useMutation } from "@tanstack/react-query";
import { approveListing } from "../../api/adminapi";
import { blockListing } from "../../api/adminapi";
import { useState } from "react";
import ListingApprove from "../common/modal/ListingApprove";
import ConfirmationModal from "../common/modal/confirmationModal";
import { toast } from "sonner";

interface UserTableProps {
    userInfos: {
        data:any[]
    };
    refetch: any;
    info: string;
}

const ListingTable: React.FC<UserTableProps> = ({ userInfos, refetch}) => {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

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
                            {userInfos?.data?.map((data, index) =>
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
                            message={`Are you sure you want to approve '${userInfos.data.find((listing) => listing._id === selectedUserId)?.name}' ?`}
                            onConfirm={approveConfirmation}
                            onCancel={closeApproveModal}
                        />
                    )}
                    <>
                        {isConfirmationModalOpen && (
                            <ConfirmationModal
                                message={`Are you sure you want to ${userInfos.data.find((listing) => listing._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this listing?`}
                                onConfirm={blockConfirmation}
                                onCancel={closeConfirmationModal}
                            />
                        )}
                    </>
                </div>
            </>
        </div>
    );
};

export default ListingTable;

