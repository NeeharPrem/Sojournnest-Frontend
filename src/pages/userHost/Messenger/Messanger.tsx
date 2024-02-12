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
import ErrorBoundary from "../../../components/ErrorBoundry/Error";

export const Messanger = () => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [conversationIdSelected, setConversationIdSelected] = useState<string | null>(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState<{
        fname?: string;
        lname?: string;
        image?: string;
    }>({});
   
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

    const messageQueries = useQueries({
        queries: membersWithConvoId.map(({ conversationId }) => ({
            queryKey: ['messages', conversationId],
            queryFn: () => getMessage(conversationId),
            enabled: !!conversationId,
            meta: { conversationId },
        })),
    });

    const lastmsg=messageQueries.map((items)=>(
        items.data?.data
    ))

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
        const selectedUser = usersWithConvoId.find(userWithConvo => userWithConvo.user._id === userId)?.user;
        if (selectedUser) {
            setSelectedUserDetails({
                fname: selectedUser.fname,
                lname: selectedUser.lname,
                image: selectedUser.profilePic,
            });
        }
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
            <div className="flex lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                <div className="flex bg-blue-gray-300 w-80 h-screen border-r-4">
                    <ErrorBoundary>
                        <ConversationList
                            lastMsg={lastmsg}
                            usersWithConvoId={usersWithConvoId}
                            onConversationSelect={handleConversationSelect}
                        />
                    </ErrorBoundary>
                </div>
                <div className="lg:w-full">
                    {conversationIdSelected ? (
                        <ChatComponent
                            refetch={refetch}
                            messages={message}
                            rcv={selectedUserId || undefined}
                            Me={userId || undefined}
                            convId={conversationIdSelected}
                            fname={selectedUserDetails.fname}
                            lname={selectedUserDetails.lname}
                            image={selectedUserDetails.image}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-screen">
                            <p>No chats selected</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};