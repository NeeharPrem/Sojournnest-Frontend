import React, { useState } from "react";
import ConfirmationModal from "../common/modal/confirmationModal";
import { useMutation } from "@tanstack/react-query";
import { unlist } from "../../api/userapi";
import Loader from "../common/Loader";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import { Link } from "react-router-dom";

interface Room {
  _id: string;
  images: string[];
  name: string;
  state: string;
  district: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rent: number;
  is_listed: boolean;
}

interface MyComponentProps {
  roomInfo: Room[];
  refetch: () => void;
  isLoading: boolean;
}

const ListingTable: React.FC<MyComponentProps> = ({
  roomInfo,
  refetch,
  isLoading,
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // const [selectedRooms, setSelectedRooms] = useState<{ [key: string]: boolean }>({});

  // const handleCheckboxChange = (roomId: string, isChecked: boolean) => {
  //     setSelectedRooms((prevSelectedRooms) => ({
  //         ...prevSelectedRooms,
  //         [roomId]: isChecked,
  //     }));
  // };

  const { mutate: unlistData } = useMutation({
    mutationFn: unlist,
    onSuccess: (response) => {
      if (response) {
        refetch();
      }
    },
  });

  const handleConfirmation = () => {
    unlistData(selectedId);
    setIsConfirmationModalOpen(false);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const openConfirmationModal = (userId: string) => {
    setSelectedId(userId);
    setIsConfirmationModalOpen(true);
  };

  if (roomInfo.length === 0) {
    return <div>No rooms available</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hosted Location
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bed Rooms
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bath Rooms
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listed
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roomInfo.map((room) => (
                  <tr key={room._id}>
                    {/* <td className='px-6 py-4 whitespace-nowrap'>
                                            <input
                                                type="checkbox"
                                                checked={!!selectedRooms[room.id]}
                                                onChange={(e) => handleCheckboxChange(room.id, e.target.checked)}
                                            />
                                        </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center">
                        {room.images.length > 0 && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={room.images[0]}
                              alt={`${room.name} thumbnail`}
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {room.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {room.state}
                          </div>
                          <div className="text-sm text-gray-500">
                            {room.district}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {room.bedrooms}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {room.bathrooms}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">{room.guests}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">₹ {room.rent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className={`py-1 px-2 rounded-lg text-black ${room.is_listed ? "bg-red-200" : "bg-green-200"}`}
                        onClick={() => openConfirmationModal(room._id)}
                      >
                        {room.is_listed ? "Unlist" : "List"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        <Link to={`/editRoom/${room._id}`}>
                          <BorderColorSharpIcon />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to ${roomInfo.find((user) => user._id === selectedId)?.is_listed ? "unlist" : "List"} Location ?`}
          onConfirm={handleConfirmation}
          onCancel={closeConfirmationModal}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default ListingTable;
