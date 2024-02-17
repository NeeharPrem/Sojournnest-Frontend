import { Link } from 'react-router-dom';

const DashBar = () => {
    return (
        <div className="flex justify-end items-center bg-cream border-b py-2 px-4">
            <div className="flex items-center space-x-2">
                <Link to="/chats" className="text-black font-semibold text-sm">Chats</Link>
                <Link to="/host" className="text-black font-semibold text-sm">Listings</Link>
                <Link to="/notifications" className="text-black font-semibold text-sm">Notifications</Link>
            </div>
            
        </div>
    );
};

export default DashBar;