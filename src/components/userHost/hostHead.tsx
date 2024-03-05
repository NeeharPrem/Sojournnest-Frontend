import React from "react";
import { Link } from "react-router-dom";

const HostHeader: React.FC = () => {
  return (
    <header className="bg-white  p-4">
      <div className="flex w-full justify-between items-center">
        <p className="text-3xl font-semibold tracking-wide">Your Listings</p>
        <Link to="/location">
          <button className="bg-gray-400 text-black p-2 max-w-56 rounded">
            Add a Listing
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HostHeader;
