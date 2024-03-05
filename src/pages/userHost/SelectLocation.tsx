import Navbar from "../../components/Navbar";
import AddRoom from "../../components/userHost/addRooms/AddRoom";
import EditRoom from "../../components/userHost/addRooms/EditRoom";
import { useLocation, useParams } from 'react-router-dom';

const SelectLocation = () => {
  const location = useLocation();
  const { roomId } = useParams()
  const isEditRoom = location.pathname.includes('editRoom');

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center lg:px-20 px-5 sm:px-10 md:px-10 pt-20">
        {isEditRoom ? <EditRoom Id={roomId} /> : <AddRoom />}
      </div>
    </>
  );
};

export default SelectLocation;