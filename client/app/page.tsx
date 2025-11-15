'use client';
import { useEffect, useState, useRef } from "react";
import {io, Socket} from "socket.io-client";

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const handleClick = () => {
    if (socketRef.current) {
      socketRef.current.emit("button_clicked", {
        message : "Button was clicked!",
        status: "clicked"
      },
      (response:any)=>{
        console.log("Server response:", response);
      });
    }
  }

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
    socket.on("do_smt", (data: any) => {
      console.log("Received from server:", data);
    });

    // Listen for user count updates
    socket.on("user_count_update", (count: number) => {
      console.log("User count updated:", count);
      setUserCount(count);
    });

    // ✅ CLEANUP FUNCTION - This is crucial!
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("do_smt");
      socket.off("user_count_update");
      socket.disconnect();
    };
  }, [])
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24 gap-6">
      <div className="text-center">
        <p className={`text-lg ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </p>
        {isConnected && socketRef.current && (
          <p className="text-sm text-gray-400">
            Socket ID: {socketRef.current.id}
          </p>
        )}
        <p className="text-lg text-blue-400 mt-2">
          👥 Connected Users: {userCount}
        </p>
      </div>
      
      <button 
        className="cursor-pointer border-2 border-white p-5 rounded-2xl hover:bg-white hover:text-black transition-colors disabled:opacity-50" 
        onClick={handleClick}
        disabled={!isConnected}
      >
        Click me
      </button>
    </main>
  );
}
