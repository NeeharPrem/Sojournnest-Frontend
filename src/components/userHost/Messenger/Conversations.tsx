import React from "react";

export interface User {
    _id: string;
    fname: string;
    lname: string;
    profilePic: string;
}

interface Message {
    createdAt: Date; // Consider using a more specific type than 'any', like Date or string
    conversationId: string;
    text: string;
}

interface ConversationListProps {
    usersWithConvoId: {
        user: User;
        conversationId: string;
    }[];
    onConversationSelect: (userId: string, conversationId: string) => void;
    lastMsg: Message[][];
}

interface LastMessageInfo {
    text: string;
    createdAt?: Date; // Make this optional since there might not be a last message
}

const ConversationList: React.FC<ConversationListProps> = ({ usersWithConvoId, onConversationSelect, lastMsg }) => {
    const handleConversationClick = (userId: string, conversationId: string) => {
        onConversationSelect(userId, conversationId);
    };

    const findLastMessage = (conversationId: string): LastMessageInfo | string => {
        if (!lastMsg || lastMsg.length === 0) {
            return "No messages yet";
        }
        const conversationMessages = lastMsg.find(messages => messages?.some(message => message.conversationId === conversationId));
        if (conversationMessages && conversationMessages.length > 0) {
            const lastMessage = conversationMessages[conversationMessages.length - 1];
            return {
                text: lastMessage.text,
                createdAt: lastMessage.createdAt
            };
        }
        return "No messages yet";
    };

    const formatDate = (dateInput: Date | string): string => {
        let date = new Date(dateInput);
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            // If `dateInput` does not represent a valid date, handle the error
            console.error('Invalid date:', dateInput);
            return 'Invalid date';
        }

        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        if (date >= today) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (date >= yesterday) {
            return "Yesterday";
        } else if (date >= weekAgo) {
            return date.toLocaleDateString([], { weekday: 'long' });
        } else {
            return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    };

    return (
        <>
            <div className="bg-blue-gray-300 p-4">
                <h1 className="text-lg font-semibold">Chats</h1>
            </div>

            <ul className="flex-grow overflow-y-auto w-64">
                {usersWithConvoId.map(({ user, conversationId }) => {
                    const lastMessage = findLastMessage(conversationId);
                    const lastMessageText = typeof lastMessage === 'string' ? lastMessage : lastMessage.text;
                    const lastMessageDate = typeof lastMessage === 'object' && lastMessage.createdAt ? formatDate(lastMessage.createdAt) : '';
                    return (
                        <li key={user._id} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                            <button
                                onClick={() => handleConversationClick(user._id, conversationId)}
                                className="flex items-center p-4 w-full text-left focus:outline-none"
                            >
                                <img
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                    src={user.profilePic || "https://source.unsplash.com/random"}
                                    alt="User"
                                />
                                <div className="flex-grow min-w-0">
                                    <h2 className="text-sm font-semibold truncate">{user.fname} {user.lname}</h2>
                                    <p className="text-gray-600 text-xs truncate">{lastMessageText}</p>
                                </div>
                                <div className="whitespace-nowrap">
                                    <p className="text-green-600 text-xs">{lastMessageDate}</p>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default ConversationList;