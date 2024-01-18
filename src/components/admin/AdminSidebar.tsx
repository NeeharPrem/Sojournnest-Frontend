import { Link } from 'react-router-dom';

const sidebarItems = [
    { id: 1, label: 'Dashboard', link: '/admin/dashboard' },
    { id: 2, label: 'Users', link: '/admin/users' },
    { id: 3, label: 'Stays', link: '/admin/stays' },
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
