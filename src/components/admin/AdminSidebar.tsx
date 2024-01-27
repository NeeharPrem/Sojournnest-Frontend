import { Link } from "react-router-dom";

const sidebarItems = [
  { id: 1, label: "Dashboard", link: "/admin/dashboard" },
  { id: 2, label: "Users", link: "/admin/users" },
  { id: 3, label: "Listings", link: "/admin/listings" },
];

const AdminSidebar = () => {
  return (
    <div className="flex h-screen w-20">
      <div className="bg-gray-800 text-white w-64">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <ul className="mt-6">
          {sidebarItems.map((item) => (
            <li key={item.id} className="px-8 py-4 border-b border-gray-700">
              <Link to={item.link} className="text-gray-300 hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-gray-100"></div>
    </div>
  );
};

export default AdminSidebar;
// import React, { useState } from 'react';

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const toggleSidebar = () => setIsOpen(!isOpen);

//     return (
//         <div className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//             <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
//                 <span className="text-lg font-semibold">Admin Dashboard</span>
//                 <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
//                     {/* Icon for closing sidebar */}
//                 </button>
//             </div>
//             <nav className="px-4 py-2">
//                 {/* Navigation links */}
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;
