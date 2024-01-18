import React from 'react';

const HostHeader: React.FC = () => {
    return (
        <header className="bg-white  p-4">
            <div className="flex justify-between items-center">
                <button className="bg-blue-gray-600 text-white py-2 px-4 square-full">Offers</button>
                <button className="bg-blue-gray-600 text-white py-2 px-4 square-full">Add a Listing</button>
            </div>
        </header>
    );
};

export default HostHeader;