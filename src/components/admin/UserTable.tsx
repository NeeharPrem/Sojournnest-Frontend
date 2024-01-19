import { useMutation} from "@tanstack/react-query";
import { blockUser } from "../../api/adminapi";
import { useState } from "react";
import ConfirmationModal from "../common/modal/confirmationModal";

interface UserTable{
    userInfos: any[],
    refetch:any
}

const UserTable: React.FC<UserTable> = ({userInfos,refetch}) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const {mutate:blockuser}= useMutation({
        mutationFn:blockUser,
        onSuccess:(response)=>{
            if(response){
                refetch()
            }
        }
    })

    const handleConfirmation = () => {
        blockuser(selectedUserId);
        setIsConfirmationModalOpen(false);
    };

    const closeConfirmationModal= ()=>{
        setIsConfirmationModalOpen(false);
    }

    const openConfirmationModal = (userId:string) => {
        setSelectedUserId(userId);
        setIsConfirmationModalOpen(true);
    };

    return (
        <div className="flex justify-center">
            <table className="w-2/3 mt-8">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfos.map((user,index) => (
                        <tr key={index+1} className="border-b">
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{user.fname} {user.lname}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">
                                {user.is_blocked ? (
                                    <button
                                        onClick={() => openConfirmationModal(user._id)}
                                        className="bg-green-600 text-white py-1 px-2 rounded-lg"
                                    >
                                        Unblock
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => openConfirmationModal(user._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-lg"
                                    >
                                        Block
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isConfirmationModalOpen && (
                <ConfirmationModal
                    message={`Are you sure you want to ${userInfos.find((user) => user._id === selectedUserId)?.is_blocked ? 'unblock' : 'block'} this user?`}
                    onConfirm={handleConfirmation}
                    onCancel={closeConfirmationModal}
                />
            )}
        </div>
    );
};

export default UserTable;