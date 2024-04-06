import { useState, useEffect } from "react";
import ChatComponent from "../../../components/userHost/Messenger/Messanger";
import Header from "../../../components/Navbar";
import ConversationList from "../../../components/userHost/Messenger/Conversations";
import { useQueries, useQuery,useMutation} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { hostgetChat, getUser, hostNewconversation } from "../../../api/userapi";
import { getMessage } from "../../../api/userapi";
import socket from "../../../services/socket";
import ErrorBoundary from "../../../components/ErrorBoundry/Error";
import { useLocation } from "react-router-dom";

export const Messanger = () => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [conversationIdSelected, setConversationIdSelected] = useState<string | null>(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState<{
        fname?: string;
        lname?: string;
        image?: string;
        lastSeen?:Date
    }>({});

    const { mutate: addNewconv } = useMutation({
        mutationFn: hostNewconversation,
        onSuccess: (response) => {
            if (response) {
                console.log(response)
            }
        },
    });
   
    const userId = useSelector((state: any) => state.auth.userId);

    const location = useLocation();
    const rcvId = location.state?.userId;

    const { data: chatList, isSuccess } = useQuery({
        queryKey: ['chatData', userId],
        queryFn: () => hostgetChat(userId!),
        enabled: !!userId,
    });

    useEffect(() => {
        socket.emit("addUser", userId);
        socket.on("getUsers", (_users) => {
        });
    }, []);

    useEffect(() => {
        if (isSuccess && chatList?.data?.conv) {
            setConversations(chatList.data.conv);
        }
    }, [chatList, isSuccess]);

    useEffect(() => {
        if (rcvId) {
            getUser(rcvId).then((response: { data: any; }) => {
                const userDetails = response.data;
                setSelectedUserDetails({
                    fname: userDetails?.fname,
                    lname: userDetails?.lname,
                    image: userDetails?.profilePic,
                });
                setSelectedUserId(rcvId);
            });

            const existingConversation = conversations.find(conv =>
                conv.members.includes(rcvId)
            );

            if (existingConversation) {
                setConversationIdSelected(existingConversation._id);
            } else {
                const users={
                    senderId:userId,
                    receiverId:rcvId
                }
                addNewconv(users)
                console.log("Create and select a new conversation with the user:", rcvId);
            }
        }
    }, [rcvId, conversations, userId]);

    let membersWithConvoId = [];
    if (conversations.length > 0) {
        membersWithConvoId = conversations.flatMap(conv =>
            conv.members
                .filter((member: { userId: string | null; }) => member.userId !== userId)
                .map((member: {
                    lastSeen:Date; userId: any;}) => ({
                    memberId: member.userId,
                    conversationId: conv._id,
                    lastSeen:member.lastSeen
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

    const refetchAllMessages = () => {
        messageQueries.forEach(query => {
            if (query.refetch) {
                query.refetch().catch(error => console.error("Refetch error:", error));
            }
        });
    };

    const usersWithConvoId = membersWithConvoId.map((member, index) => {
        const queryResult = userQueries[index];
        return {
            user: queryResult.isSuccess && queryResult.data ? queryResult.data.data : null,
            conversationId: member.conversationId,
            lastSeen: member.lastSeen,
        };
    }).filter(userConvo => userConvo.user !== null);

    const handleConversationSelect = (userId: string, conversationId: string) => {
        setSelectedUserId(userId);
        setConversationIdSelected(conversationId);
        const selectedUserConvo = usersWithConvoId.find(userWithConvo => userWithConvo.user._id === userId);
        if (selectedUserConvo) {
            setSelectedUserDetails({
                fname: selectedUserConvo.user.fname,
                lname: selectedUserConvo.user.lname,
                image: selectedUserConvo.user.profilePic,
                lastSeen: selectedUserConvo.lastSeen,
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
            <>
            <Header />
            <div className="h-screen flex flex-row lg:px-16 px-3 sm:px-10 md:px-10 pt-20 lg:pb-3">
                <div className="border">
                    <ErrorBoundary>
                        <ConversationList
                            lastMsg={lastmsg}
                            usersWithConvoId={usersWithConvoId}
                            onConversationSelect={handleConversationSelect}
                        />
                    </ErrorBoundary>
                </div>
                <div className="w-full flex flex-col border">
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
                            lastSeen={selectedUserDetails.lastSeen}
                            lstmsg={refetchAllMessages}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-screen">
                            <p>No chats selected</p>
                        </div>
                    )}
                </div>
            </div>
            </>
    );
};
