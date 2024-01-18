import { useState } from 'react';

const AdminDashboard = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="flex h-screen">
            {showSidebar && (
                <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
                    <div className="flex items-center justify-between px-4 py-3">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {showSidebar ? (
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                ) : (
                                    <path
                                        d="M4 6h16M4 12h16m-7 6h7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <ul className="py-4">
                        <li className="px-6 py-3 font-medium">Users</li>
                        <li className="px-6 py-3">Products</li>
                        <li className="px-6 py-3">Orders</li>
                        <li className="px-6 py-3">Settings</li>
                    </ul>
                </aside>
            )}
            <main className="flex-1 bg-gray-100 p-10">
                <h2 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                {/* Add your content here */}
            </main>
        </div>
    );
};

export default AdminDashboard;