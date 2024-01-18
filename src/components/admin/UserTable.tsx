const UserTable = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
        { id: 4, name: 'Alice Williams', email: 'alicewilliams@example.com' },
    ];

    return (
        <div className="flex justify-center">
            <table className="w-2/3 mt-8">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">
                                <button className="bg-red-500 text-white py-1 px-2 rounded-lg">
                                    Block
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
