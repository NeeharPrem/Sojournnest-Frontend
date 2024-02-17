import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { Badge} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { addMessage } from '../../../api/userapi';
import socket from "../../../services/socket";
import { format } from 'timeago.js';
import './chat-messages.css'

interface ChatMessage {
    conversationId?: string;
    createdAt?: number | Date;
    sender: string;
    text: string;
    timestamp: Date | string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
}

interface ChatComponentProps {
    messages: ChatMessage[];
    Me: string | undefined;
    rcv: string | undefined;
    convId: string | null;
    refetch: () => void;
    fname: string | undefined
    lname: string | undefined
    image: string | undefined
    lastSeen:Date | undefined
    lstmsg: () => void;
}

interface Messagee {
    conversationId?: string;
    createdAt?: number | Date;
    sender: string;
    text: string;
    timestamp:Date | string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
}

interface UserStatus {
    lastSeen?: Date;
    online?: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ refetch, messages, Me, convId, rcv,fname,lname,image,lastSeen,lstmsg}) => {
    const [message, setMessage] = useState<string>('');
    const [arrivalMessage, setArrivalMessage] = useState<Messagee | null>(null);
    const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
    const [userStatus, setUserStatus] = useState<UserStatus>({});
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [displayMessages]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const { mutate: update } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            refetch();
            lstmsg()
        },
    });

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const data = {
                sender: Me,
                text: message,
                conversationId: convId
            };
            socket.emit("sendMessage", {
                senderId: Me,
                receiverId: rcv,
                text: message,
                timestamp: new Date().toISOString()
            });
            update(data);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on("getMessage", (data) => {
            console.log(data,"data")
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                timestamp:data.timestamp
            });
            lstmsg()
        });
    }, []);

    useEffect(() => {
        setDisplayMessages(messages);
    }, [messages]);

    useEffect(() => {
        if (arrivalMessage && rcv === arrivalMessage.sender) {
            setDisplayMessages((prevMessages) => [...prevMessages, arrivalMessage]);
        }
    }, [arrivalMessage, rcv]);

    useEffect(() => {
        if (Me) {
            socket.emit("addUser", Me);
        }

        // Listen for broad updates about online users
        socket.on("usersOnline", (onlineUsers) => {
            const user = onlineUsers.find((user: { userId: string | undefined; }) => user.userId === rcv);
            if (user) {
                setUserStatus((prevState) => ({
                    ...prevState,
                    online: user.online,
                }));
            }
        });

        // Listen for updates when a user's status changes
        socket.on("userStatusChanged", (userStatus) => {
            if (userStatus.userId === rcv) {
                const lastSeen = new Date(userStatus.lastSeen);
                setUserStatus((prevState) => ({
                    ...prevState,
                    online: false,
                    lastSeen,
                }));
            }
        });

        // Cleanup on unmount to avoid memory leaks
        return () => {
            socket.off("addUser");
            socket.off("usersOnline");
            socket.off("userStatusChanged");
        };
    }, [Me, rcv]);

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    const formatLastSeen = (lastSeenDateParam?: Date | undefined) => {
        const safeLastSeenDate = lastSeenDateParam || userStatus.lastSeen || new Date();
        if (!safeLastSeenDate || isNaN(new Date(safeLastSeenDate).getTime())) {
            return 'Last seen: Unavailable';
        }
        const lastSeenDate = new Date(safeLastSeenDate);
        const now = new Date();

        let timeString = '';
        if (isSameDay(lastSeenDate, now)) {
            let hours = lastSeenDate.getHours();
            const minutes = lastSeenDate.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            timeString = `Last seen today at ${hours}:${minutes} ${ampm}`;
        } else {
            const datePart = lastSeenDate.toLocaleDateString();
            let hours = lastSeenDate.getHours();
            const minutes = lastSeenDate.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            timeString = `Last seen: ${datePart} at ${hours}:${minutes} ${ampm}`;
        }

        return timeString;
    };


    return (
            <>
            <div className="flex items-center justify-between text-black p-2 lg:border-b-2">
                <div className="flex flex-col items-center space-x-2">
                    <div className='flex flex-row gap-2'>
                        <img
                            src={image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        {/* <Badge className='bg-green-600'>
                        </Badge> */}
                        <div className="flex flex-col text-sm text-gray-600">
                            <span className="font-bold text-black">{fname} {lname}</span>
                            {userStatus.online ? 'Online' : formatLastSeen(lastSeen)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto scrollbar-width-none chat-messages">
                {displayMessages && displayMessages.map((item) => (
                    <div
                        key={item._id}
                        className={`flex ${item.sender === Me ? 'justify-end ' : 'justify-start '} mb-2 `}
                    >
                        <div
                            className={`${item.sender === Me ? 'bg-green-500 text-white' : 'bg-gray-600 text-black'
                                } px-4 py-2 rounded-lg`}
                        >
                            {item.text}
                            <div className="text-xs text-black">
                                {item.createdAt || item.timestamp ? format(new Date(item.createdAt || item.timestamp)) : "timestamp unavailable"}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        className="flex-1 border border-gray-300 p-2 rounded-l-lg"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
            </>
    );
};

export default ChatComponent;