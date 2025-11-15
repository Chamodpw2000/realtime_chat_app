'use client';
import Chat from "@/components/Chat";
import Input from "@/components/Input";
import SignUp from "@/components/SignUp";
import { ChatMessageType } from "@/types";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useRef<string | null>(null);
  const [chat, setChat] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  

  useEffect(() => {
    // Create socket connection
    socketRef.current = io("http://localhost:3001");
    const socket = socketRef.current;

    // Connection event listeners
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      setIsConnected(true);
      socket.emit("client_ready", "Hello from client");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Custom event listeners
    socket.on("message_received", (data : any) => {
      console.log("Received message from server:", data);
      setChat((prev) => [...prev, data]);
    });


    socket.on("new_user_signed_up", (data : any) => {
      console.log("New user signed up:", data);
      setChat((prev) => [...prev, {content: `${data.user} has joined the chat`, type: 'system' , user: data}]);
    });
    socket.on("user_typing_status", (data : any) => {
      console.log("typing status", data);
      
      setTypingUsers((prev) => {
        const userName = data.user?.name || "Unknown User";
        let updatedUsers;
        
        if (data.typing) {
          if (!prev.includes(userName)) {
            updatedUsers = [...prev, userName];
          } else {
            updatedUsers = prev;
          }
        } else {
          updatedUsers = prev.filter((name) => name !== userName);
        }
        
        console.log("Updated typing users:", updatedUsers);
        return updatedUsers;
      });
    });

        








    

    // ✅ CLEANUP FUNCTION - This is crucial!
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_received");
      socket.off("new_user_signed_up");
      socket.off("user_typing_status");
      socket.disconnect();
    };
  }, [])
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">

      {isLoggedIn ?


        <div className="w-full flex flex-col items-center justify-center">

          <Chat setChat={setChat} user={user} chat={chat} socket={socketRef.current} />
          
          {/* Display typing users */}
          {typingUsers.length > 0 && (
            <div className="text-sm text-gray-500 italic mt-2 mb-4">
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...` 
                : `${typingUsers.join(', ')} are typing...`}
            </div>
          )}

        </div> :

        <div className="w-full">
          
        <SignUp user={user} socket={socketRef.current} input={input} setInput={setInput} onLogin={() => setIsLoggedIn(true)} />
        
        </div>}



    </main>
  );
}
