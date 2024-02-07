import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import { addMessage } from '../../../api/userapi';
import socket from "../../../services/socket";
import { combineSlices } from '@reduxjs/toolkit';

interface ChatMessage {
    conversationId?: string;
    createdAt?: Date | Number;
    sender: string;
    text: string;
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
}


interface Messagee {
    conversationId?: string;
    createdAt?: Date | Number;
    sender: string;
    text: string;
    image?: string
    updatedAt?: string;
    __v?: number;
    _id?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ refetch, messages, Me, convId, rcv }) => {
    const [message, setMessage] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [arrivalMessage, setArrivalMessage] = useState<Messagee | null>(null);
   

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        setIsConnected(socket.connected);
        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const { mutate: update } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            refetch();
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
            });
            update(data);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
            });
        });
    }, []);
    console.log(arrivalMessage)

    // useEffect(() => {
    //     arrivalMessage &&
    //         rcv=== arrivalMessage.sender &&
    //         message((prev: any) => [...prev, arrivalMessage]);
    // }, [arrivalMessage, rcv]);

    
    return (
        <div className="flex flex-col bg-gray-100 h-screen">
            <div className="flex items-center justify-between bg-green-300 text-black p-2 h-16">
                {/* User info could be dynamic */}
                <div className="flex items-center space-x-2">
                    <img
                        src="https://source.unsplash.com/random"
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-black">John Doe</span>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages && messages.map((item) => (
                    <div
                        key={item._id}
                        className={`flex ${item.sender === Me ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                        <div
                            className={`${item.sender === Me ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                } px-4 py-2 rounded-lg`}
                        >
                            {item.text}
                        </div>
                    </div>
                ))}
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
        </div>
    );
};

export default ChatComponent;
