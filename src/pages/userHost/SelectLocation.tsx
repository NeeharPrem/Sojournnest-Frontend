import Navbar from "../../components/Navbar";
import AddRoom from "../../components/userHost/addRooms/AddRoom";
import { useLocation } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";

const SelectLocation = () => {
  const location = useLocation();
  const mode = location.pathname.includes('addRoom') ? 'add' : 'edit';
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10">
        <AddRoom mode={mode} />
      </div>
    </>
  );
};

export default SelectLocation;