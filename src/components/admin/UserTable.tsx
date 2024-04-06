import { useMutation } from "@tanstack/react-query";
import { blockUser } from "../../api/adminapi";
import { approveUser } from "../../api/adminapi";
import { SetStateAction, useState } from "react";
import ApproveModal from "../common/modal/approveModal";
import ConfirmationModal from "../common/modal/confirmationModal";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../api/adminapi";
import { toast } from "sonner";
import { useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface userInfo {
  _id:string;
   lname:string;
   fname:string;
   email:string;
   is_approved:boolean;
   verifyId:string;
   is_blocked:boolean;

}

const UserTable= () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({ id: "", verifyId: "" });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10; 

  const { data: Data, refetch, isSuccess,isLoading} = useQuery({
    queryKey: ["userData",page,limit],
    queryFn: () => allUsers(page,limit),
  });

  useEffect(() => {
    if (isSuccess && Data) {
      setTotalPages(Math.ceil(Data?.total / limit));
    }
  }, [isSuccess, Data, limit]);

  const handlePageChange = (_event: any, value: SetStateAction<number>) => {
    setPage(value);
  };

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
              {Data?.data.map((data: userInfo,index:number) =>
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
                  message={`Are you sure you want to ${Data?.data.find((user:userInfo) => user._id === selectedUserId)?.is_blocked ? "unblock" : "block"} this user?`}
                  onConfirm={handleConfirmation}
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

export default UserTable;