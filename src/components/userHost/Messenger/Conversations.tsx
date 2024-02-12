import React from "react";

export interface User {
    _id: string;
    fname: string;
    lname: string;
    profilePic: string;
}

interface Message {
    conversationId: string;
    text: string;
    // Add other properties like sender, timestamp etc. as needed
}

interface ConversationListProps {
    usersWithConvoId: {
        user: User;
        conversationId: string;
    }[];
    onConversationSelect: (userId: string, conversationId: string) => void;
    lastMsg: Message[][];
}

const ConversationList: React.FC<ConversationListProps> = ({ usersWithConvoId, onConversationSelect, lastMsg }) => {
    const handleConversationClick = (userId: string, conversationId: string) => {
        console.log(`Conversation with user ${userId} clicked.`);
        onConversationSelect(userId, conversationId);
    };


    const findLastMessage = (conversationId: string): string => {
        if (!lastMsg || lastMsg.length === 0) {
            return "No messages yet";
        }
        const conversationMessages = lastMsg.find(messages => messages?.some(message => message.conversationId === conversationId));
        if (conversationMessages && conversationMessages.length > 0) {
            const lastMessage = conversationMessages[conversationMessages.length - 1];
            return lastMessage.text;
        }
        return "No messages yet";
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
                                <p className="text-gray-600">{findLastMessage(conversationId)}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList;