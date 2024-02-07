import React, { useState, useEffect } from "react";
import ChatComponent from "../../../components/userHost/Messenger/Messanger";
import Header from "../../../components/Navbar";
import ConversationList from "../../../components/userHost/Messenger/Conversations";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from '../../../store/store';
import { hostgetChat, getUser } from "../../../api/userapi";
import { getMessage } from "../../../api/userapi";
import socket from "../../../services/socket";

interface UserWithConvoId {
    user: any;
    conversationId: string;
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

export const Messanger = () => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [conversationIdSelected, setConversationIdSelected] = useState<string | null>(null);
    const [arrivalMessage, setArrivalMessage] = useState<Messagee | null>(null);
   
    const userId = useSelector((state: RootState) => state.auth.userId);

    // Fetch conversations
    const { data: chatList, isSuccess } = useQuery({
        queryKey: ['chatData', userId],
        queryFn: () => hostgetChat(userId!),
        enabled: !!userId,
    });

    //socket io config
    useEffect(() => {
        socket.emit("addUser", userId);
        socket.on("getUsers", (users) => {
            console.log(users, "socket");
        });
    }, []);


    useEffect(() => {
        if (isSuccess && chatList?.data?.conv) {
            setConversations(chatList.data.conv);
        }
    }, [chatList, isSuccess]);

    let membersWithConvoId = [];
    if (conversations.length > 0) {
        membersWithConvoId = conversations.flatMap(conv =>
            conv.members.filter((memberId: string | null) => memberId !== userId).map((memberId: any) => ({
                memberId,
                conversationId: conv._id,
            }))
        );
    }

    const userQueries = useQueries({
        queries: membersWithConvoId.map(({ memberId, conversationId }) => ({
            queryKey: ['usersData', memberId],
            queryFn: () => getUser(memberId),
            enabled: !!memberId,
            meta: { conversationId },
        })),
    });

    const usersWithConvoId = membersWithConvoId.map((member, index) => {
        const queryResult = userQueries[index];
        return {
            user: queryResult.isSuccess && queryResult.data ? queryResult.data.data : null,
            conversationId: member.conversationId,
        };
    }).filter(userConvo => userConvo.user !== null); 

    const handleConversationSelect = (userId: string, conversationId: string) => {
        setSelectedUserId(userId);
        setConversationIdSelected(conversationId);
    };

    const { data: messageData,refetch} = useQuery({
        queryKey: ["messageData", conversationIdSelected],
        queryFn: () => conversationIdSelected ? getMessage(conversationIdSelected) : Promise.reject("No conversationId"),
        enabled: !!conversationIdSelected,
    });
    const message= messageData?.data
    
    
    return (
        <div className="">
            <Header />
            <div className="flex flex-row ps-4 pe-4">
                <div className="flex bg-blue-gray-300 w-80 h-screen border-r-4">
                    <ConversationList
                        usersWithConvoId={usersWithConvoId}
                        onConversationSelect={handleConversationSelect}
                    />
                </div>
                <div className="lg:w-full">
                    <ChatComponent refetch={refetch} messages={message} rcv={selectedUserId || undefined} Me={userId || undefined} convId={conversationIdSelected}/>
                </div>
            </div>
        </div>
    );
};