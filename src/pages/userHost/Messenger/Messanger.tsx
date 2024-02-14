import { useState, useEffect } from "react";
import ChatComponent from "../../../components/userHost/Messenger/Messanger";
import Header from "../../../components/Navbar";
import ConversationList from "../../../components/userHost/Messenger/Conversations";
import { useQueries, useQuery,useMutation} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from '../../../store/store';
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
    }>({});

    const { mutate: addNewconv } = useMutation({
        mutationFn: hostNewconversation,
        onSuccess: (response) => {
            if (response) {
                console.log(response)
            }
        },
    });
   
    const userId = useSelector((state: RootState) => state.auth.userId);

    const location = useLocation();
    const rcvId = location.state?.userId;

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
            console.log("socket");
        });
    }, []);


    useEffect(() => {
        if (isSuccess && chatList?.data?.conv) {
            setConversations(chatList.data.conv);
        }
    }, [chatList, isSuccess]);

    // check rcvId
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

            // Check if there's already a conversation with the rcvId
            const existingConversation = conversations.find(conv =>
                conv.members.includes(rcvId)
            );

            if (existingConversation) {
                // If conversation exists, select it
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

    // refetch
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
                            lstmsg={refetchAllMessages}
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