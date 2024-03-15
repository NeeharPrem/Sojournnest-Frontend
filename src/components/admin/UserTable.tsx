import { useMutation } from "@tanstack/react-query";
import { blockUser } from "../../api/adminapi";
import { approveUser } from "../../api/adminapi";
import { useState } from "react";
import ApproveModal from "../common/modal/approveModal";
import ConfirmationModal from "../common/modal/confirmationModal";
import { toast } from "sonner";

interface UserTableProps {
  userInfos: any[];
  refetch: any;
  info: string;
}

const UserTable: React.FC<UserTableProps> = ({ userInfos, refetch}) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({ id: "", verifyId: "" });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { mutate: blockuser } = useMutation({
    mutationFn: blockUser,
    onSuccess: (response) => {
      if (response) {
        refetch();
      }
    },
  });

  const { mutate: approve } = useMutation({
    mutationFn: approveUser,
    onSuccess: (response) => {
      if (response?.status===200) {
        toast.success('User approved')
        refetch();
      }
    },
  });

  const handleConfirmation = () => {
    blockuser(selectedUserId);
    setIsConfirmationModalOpen(false);
  };

  const approveConfirmation = () => {
    approve(selectedUserId);
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

  const openApproveModal = (userId: string, verifyId: string) => {
    setSelectedUserId(userId)
    setSelectedUser({ id: userId, verifyId });
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
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
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
              {userInfos.map((data,index) =>
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {index+1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {data.fname} {data.lname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {data.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {!data?.is_approved && data?.verifyId ? (
                        <button
                          onClick={() => openApproveModal(data._id, data.verifyId)}
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
            <ApproveModal
              message={`${selectedUser.verifyId}`}
              onConfirm={approveConfirmation}
              onCancel={closeApproveModal}
            />
          )}
          <>
            {isConfirmationModalOpen && (
              <ConfirmationModal
                  message={`Are you sure you want to ${userInfos.find((user) => user._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this user?`}
                  onConfirm={handleConfirmation}
                  onCancel={closeConfirmationModal}
                />
              )}
          </>
      </div>
      </>
    </div>
  );
};

export default UserTable;

