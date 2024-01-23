import Navbar from '../../components/Navbar';
import AddRoom from '../../components/userHost/addRooms/AddRoom';

const SelectLocation = () => {
    return (
               <>
               <Navbar/>
            <div className="flex justify-center mt-10">
                <AddRoom />
            </div>
               </>

    );
};

export default SelectLocation;
