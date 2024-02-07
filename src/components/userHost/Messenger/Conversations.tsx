import React from "react";

export interface User {
    _id: string;
    fname: string;
    lname: string;
    profilePic: string;
}

interface ConversationListProps {
    usersWithConvoId: {
        user: User; // Adjusted to match the User interface
        conversationId: string;
    }[];
    onConversationSelect: (userId: string, conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ usersWithConvoId, onConversationSelect }) => {
    const handleConversationClick = (userId: string, conversationId: string) => {
        console.log(`Conversation with user ${userId} clicked.`);
        onConversationSelect(userId,conversationId);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-blue-gray-300 p-4 shadow-md h-16">
                <h1 className="text-lg font-semibold">Conversations</h1>
            </div>
            <ul className="flex-grow overflow-y-auto">
                {usersWithConvoId.map(({ user, conversationId }) => (
                    <li key={user._id} className="flex items-center p-4 border-b border-gray-200">
                        <button
                            onClick={() => handleConversationClick(user._id, conversationId)}
                            className="flex items-center p-4 w-full text-left"
                        >
                            <img
                                className="w-12 h-12 rounded-full object-cover mr-4"
                                src={user.profilePic || "https://source.unsplash.com/random"}
                                alt="User"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{user.fname} {user.lname}</h2>
                                <p className="text-gray-600">Hey, how are you doing?</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList;