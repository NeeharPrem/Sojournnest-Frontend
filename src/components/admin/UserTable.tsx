import { useMutation } from "@tanstack/react-query";
import { blockUser } from "../../api/adminapi";
import { approveListing } from "../../api/adminapi";
import { blockListing } from "../../api/adminapi";
import { useState } from "react";
import ConfirmationModal from "../common/modal/confirmationModal";
import { Pagination } from "@mui/material";

interface UserTableProps {
  userInfos: any[];
  refetch: any;
  info: string;
}

const UserTable: React.FC<UserTableProps> = ({ userInfos, refetch, info }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
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
  const { mutate: blockList } = useMutation({
    mutationFn: blockListing,
    onSuccess: (response) => {
      if (response) {
        refetch();
      }
    },
  });

  const { mutate: approveList } = useMutation({
    mutationFn: approveListing,
    onSuccess: (response) => {
      if (response) {
        refetch();
      }
    },
  });

  const handleConfirmation = () => {
    blockuser(selectedUserId);
    setIsConfirmationModalOpen(false);
  };

  const blockConfirmation = () => {
    blockList(selectedUserId);
    setIsConfirmationModalOpen(false);
  };

  const approveConfirmation = () => {
    console.log("yup");
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

  const openApproveModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsApproveModalOpen(true);
  };

  return (
    <div className="justify-center flex-col">
      <>
      <div className="flex justify-center">
          <table className="w-2/3 mt-8 border shadow rounded-lg bg-white">
            <thead className="bg-gray-200">
              {info === "listings" ? (
                <tr>
                  <th className="py-2 px-4">No</th>
                  <th className="py-2 px-4">Location Name</th>
                  <th className="py-2 px-4">Hosted Person</th>
                  <th className="py-2 px-4">Approved status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              ) : (
                <tr>
                  <th className="py-2 px-4">No</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {info === "listings"
                ? userInfos.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4 text-center">{data.name}</td>
                    <td className="py-2 px-4 text-center">
                      {data?.userId?.fname} {data?.userId?.lname}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {data.is_approved ? (
                        <h3 className="text-green-600">Approved</h3>
                      ) : (
                        <button
                          onClick={() => openApproveModal(data._id)}
                          className="bg-green-900 text-white py-1 px-2 rounded-lg"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
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
                    </td>
                  </tr>
                ))
                : userInfos.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4 text-center">
                      {user.fname} {user.lname}
                    </td>
                    <td className="py-2 px-4 text-center">{user.email}</td>
                    <td className="py-2 px-4 text-center">
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
          {isApproveModalOpen && (
            <ConfirmationModal
              message={`Are you sure you want to approve '${userInfos.find((listing) => listing._id === selectedUserId)?.name}' ?`}
              onConfirm={approveConfirmation}
              onCancel={closeApproveModal}
            />
          )}
          <>
            {info === "listings"
              ? isConfirmationModalOpen && (
                <ConfirmationModal
                  message={`Are you sure you want to ${userInfos.find((listing) => listing._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this listing?`}
                  onConfirm={blockConfirmation}
                  onCancel={closeConfirmationModal}
                />
              )
              : isConfirmationModalOpen && (
                <ConfirmationModal
                  message={`Are you sure you want to ${userInfos.find((user) => user._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this user?`}
                  onConfirm={handleConfirmation}
                  onCancel={closeConfirmationModal}
                />
              )}
          </>
      </div>
      {/* <div className="flex justify-center">
          <Pagination count={5} variant="outlined" shape="rounded"/>
      </div> */}
      </>
    </div>
  );
};

export default UserTable;

